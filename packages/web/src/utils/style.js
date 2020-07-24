import styled from "@emotion/styled";
import { css, get } from "@theme-ui/css";
import { compose } from "styled-system";
import memoize from "@emotion/memoize";
import isPropValid from "@emotion/is-prop-valid";

export const createShouldForwardProp = ({ yep = [], nope = [] }) => {
  const yepPattern = new RegExp(`^(${yep.join("|")})$`);
  const nopePattern = new RegExp(`^(${nope.join("|")})$`);
  return memoize(
    prop =>
      (isPropValid(prop) || yepPattern.test(prop)) && !nopePattern.test(prop)
  );
};

export const systemComponent = (
  component = "div",
  {
    systemProps = [],
    baseStyles = {},
    shouldForwardProp: _shouldForwardProp = [],
    themeKey = "variants",
    variant: _variant,
  }
) => {
  const shouldForwardProp = createShouldForwardProp({
    yep: _shouldForwardProp,
    nope: systemProps.map(p => p.propNames),
  });
  const base = props => css(props.__css || baseStyles)(props.theme);
  const sx = props => css(props.sx)(props.theme);
  let variant = ({ theme, variant, __themeKey = themeKey }) => {
    return css(get(theme, __themeKey + "." + variant, get(theme, variant)));
  };
  if (typeof _variant === "function") {
    variant = _variant({ css, get });
  }

  return styled(component, { shouldForwardProp })(
    base,
    variant,
    compose(...systemProps),
    sx,
    props => props.css
  );
};
