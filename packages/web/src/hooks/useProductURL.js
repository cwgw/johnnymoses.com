import get from "lodash/get";
import { useStaticQuery, graphql } from "gatsby";

import { resolve as urlResolve } from "../utils/url";

const defaults = {
  absolute: false,
};

const useProductURL = (slug = "", _options = {}) => {
  const options = { ...defaults, ..._options };

  const data = useStaticQuery(graphql`
    {
      sanitySiteGlobal {
        content {
          siteHostname {
            current
          }
          routes {
            productRouteRoot {
              current
            }
          }
        }
      }
    }
  `);

  const hostname = get(data, "sanitySiteGlobal.content.siteHostname.current");

  const productRoute = get(
    data,
    "sanitySiteGlobal.content.routes.productRouteRoot.current"
  );

  if (options.absolute) {
    return urlResolve(hostname, productRoute, slug);
  }

  return urlResolve(productRoute, slug);
};

export default useProductURL;
