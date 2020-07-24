import space from "@styled-system/space";

const getProps = test => props => {
  const next = {};
  for (let key in props) {
    if (test(key || "")) {
      next[key] = props[key];
    }
  }

  return next;
};

const testSpace = new RegExp(`^(${space.propNames.join("|")})$`);

export const includeSpaceProps = getProps(p => testSpace.test(p));
export const omitSpaceProps = getProps(p => !testSpace.test(p));
