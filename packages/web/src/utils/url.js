// url test
// adapted from https://gist.github.com/dperini/729294
const urlPattern = new RegExp(
  "^" +
    // protocol identifier (optional)
    "(?:" +
      "(?<scheme>https?|ftp):\\/\\/" +
    "|" +
      "(?<isProtocolRelative>\\/\\/)" +
    ")?" +
    // user:pass BasicAuth (optional)
    "(?:(?<basicauth>\\S+(?::\\S*)?)@)?" +
    // hostname (optional)
    "(?<hostname>" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
      // host & domain names, may end with dot
      "(?:" +
        "(?:" +
          "[a-z0-9\\u00a1-\\uffff]" +
          "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
        ")?" +
        "[a-z0-9\\u00a1-\\uffff]\\." +
      ")+" +
      // TLD identifier name, may end with dot
      "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")?" +
    // port number (optional)
    "(?::(?<port>\\d{2,5}))?" +
    // resource path (optional)
    "(?<pathname>[/?#]\\S*)?" +
  "$",
  "i"
);

// parse string as url
// returns object of {
//   isProtocolRelative,
//   scheme,
//   basicauth,
//   hostname,
//   port,
//   pathname,
// }
// or null if string fails regex
export function parse(str) {
  if (typeof str !== 'string') {
    return null;
  }

  const match = str.match(urlPattern);
  if (!match) {
    return null;
  }

  const matches = match.groups;

  matches.isProtocolRelative = !!matches.isProtocolRelative

  return matches;
}

// join path parts
export function join(...parts) {
  return parts
    .reduce((arr, str) => {
      if (typeof str !== 'string') {
        return arr;
      }

      const fragments = str.split('/').filter(Boolean);
      return arr.concat(fragments);
    }, [])
    .join('/');
}

// sort of like node's path.resolve method
// attempts to join arguments into a url string
// 
// the first argument gets special attention:
// if a protocol and hostname can be pulled from it,
// then the returned url will be built on top of those.
// (if the first arg is protocol relative [i.e. begins with '//']
// then the returned url will be as well)
// if no hostname can be extracted, then the returned url
// will be relative (i.e. '/some/path')
//
// subsequent arguments will be joined to the first with backslashes
// * note that hashes and query strings aren't supported
//
// the last argument may be an options object
// available options are:
//   - trailingSlash (default false)
//   - defaultProtocol (default 'https')
//
export function resolve(base, ...parts) {
  let options = parts.pop();
  if (typeof options === 'string') {
    parts.push(options);
    options = {};
  }
  
  const defaults = {
    trailingSlash: false,
    defaultProtocol: 'https',
  }

  options = { ...defaults, options };

  const parsed = parse(base) || {};

  let protocol = "";
  if (parsed.hostname) {
    if (parsed.scheme) {
      protocol = `${parsed.scheme}://`
    } else if (options.defaultProtocol) {
      protocol = `${options.defaultProtocol}://`
    }
  } else if (parsed.isProtocolRelative) {
    protocol = "//"
  }

  const hostname = parsed.hostname || "";

  const port = parsed.port ? `:${parsed.port}` : '';

  let pathname;
  if (!parsed.hostname) {
    pathname = join(parsed.pathname || base, ...parts);
  } else {
    pathname = join(parsed.pathname, ...parts)
  }

  if (pathname && !(parsed.hostname || parsed.isProtocolRelative)) {
    pathname = `/${pathname}`;
  }
  
  if (options.trailingSlash) {
    pathname = `${pathname}/`
  }

  const url = `${protocol}${hostname}${port}${pathname}`;

  return url;
}
