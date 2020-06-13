import memoize from "@emotion/memoize";
import isPropValid from "@emotion/is-prop-valid";

const createShouldForwardProp = ({ yep = [], nope = [] }) => {
  const yepPattern = new RegExp(`^(${yep.join("|")})$`);
  const nopePattern = new RegExp(`^(${nope.join("|")})$`);
  return memoize(
    prop =>
      (isPropValid(prop) || yepPattern.test(prop)) && !nopePattern.test(prop)
  );
};

export default createShouldForwardProp;
