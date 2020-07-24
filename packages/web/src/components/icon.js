import React from "react";
import PropTypes from "prop-types";
import * as Icons from "react-feather";
import camelCase from "lodash/camelCase";
import { animated, useTransition } from "react-spring";

import Text from "./text";

const upperFirst = str => {
  if (typeof str !== "string") {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

const baseStyles = {
  "& *": {
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke",
  },
};

const iconNameMap = {
  cd: "disc",
  dvd: "disc",
};

const propTypes = {
  icon: PropTypes.string.isRequired,
};

const defaultProps = {
  delay: 0,
};

const AnimatedText = animated(Text);

const Icon = ({ icon: _icon, animated, delay, ...props }) => {
  const icon = upperFirst(
    camelCase(iconNameMap[_icon.toLowerCase()]) || camelCase(_icon)
  );

  const transition = useTransition(_icon, {
    from: { strokeDashoffset: -70 },
    enter: { strokeDashoffset: 0, delay },
    leave: { strokeDashoffset: 70 },
    config: {
      tension: 300,
      friction: 21,
    },
  });

  if (!Icons[icon]) {
    return null;
  }

  if (animated) {
    return transition(style => (
      <AnimatedText
        as={Icons[icon]}
        variant="default"
        aria-hidden="true"
        {...props}
        __themeKey="icons"
        __css={baseStyles}
        style={{
          strokeDasharray: 70,
          ...style,
        }}
      />
    ));
  }

  return (
    <Text
      as={Icons[icon]}
      variant="default"
      aria-hidden="true"
      {...props}
      __themeKey="icons"
      __css={baseStyles}
    />
  );
};

Icon.defaultProps = defaultProps;

Icon.propTypes = propTypes;

export default Icon;
