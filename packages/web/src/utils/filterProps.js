import space from "@styled-system/space";

export const getProps = test => props => {
  const next = {};
  for (let key in props) {
    if (test(key || "")) {
      next[key] = props[key];
    }
  }

  return next;
};

const testSpace = new RegExp(`^(${space.propNames.join("|")})$`);

export const omitProps = propNames => {
  const test = new RegExp(`^(${propNames.join("|")})$`);
  return getProps(p => !test.test(p));
};

export const includeProps = propNames => {
  const test = new RegExp(`^(${propNames.join("|")})$`);
  return getProps(p => test.test(p));
};

export const includeSpaceProps = getProps(p => testSpace.test(p));
export const omitSpaceProps = getProps(p => !testSpace.test(p));
