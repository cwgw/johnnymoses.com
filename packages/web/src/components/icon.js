import React from "react";
import PropTypes from "prop-types";
import camelCase from "lodash/camelCase";
import { animated, useTransition } from "react-spring";

import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Disc,
  Download,
  ExternalLink,
  MapPin,
  Minus,
  Plus,
  X,
  Youtube,
} from "react-feather";

import { upperFirst } from "../utils/helpers";
import Text from "./text";

const BrandAppleMusic = React.forwardRef(
  ({ color = "currentColor", size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18.5 24h-13c-3 0-5.5-2.5-5.5-5.5v-13C0 2.5 2.5 0 5.5 0h13c3 0 5.5 2.5 5.5 5.5v13c0 3-2.5 5.5-5.5 5.5zm-.9-13.9V4.2c0-.3-.2-.5-.6-.5-1.7.2-6.9 1.3-7.9 1.6-.3 0-.5.2-.6.5-.1 3.1 0 6.2 0 9.2 0 .4-.2.8-.6.9-1.5.2-3.4.7-3.1 2.6.2 1.4 1.8 1.8 3 1.4 1.1-.3 1.7-1.4 1.6-2.5V9.5c0-.3.1-.4.4-.5 2.2-.5 4.3-1 6.5-1.4.2 0 .3.1.3.2.1 1.9 0 3.9 0 5.8-.1.3-.2.5-.5.5-.7.2-1.5.2-2.1.6-.8.4-1.2 1.2-1 2 .4 2.1 3.6 1.9 4.4.2.5-1.9 0-4.6.2-6.8z" />
    </svg>
  )
);

const BrandSpotify = React.forwardRef(
  ({ color = "#1db954", size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.7.5-1 .2-2.8-1.7-6.4-2.1-10.5-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.6-1 8.5-.6 11.7 1.3.2.4.3.9.1 1.2zM19 14c-.3.4-.8.6-1.3.3-3.2-2-8.1-2.6-12-1.4-.5.1-1-.1-1.2-.6-.1-.5.1-1 .6-1.2 4.4-1.3 9.8-.7 13.5 1.6.5.3.6.9.4 1.3zm.1-3.4C15.2 8.3 8.8 8.1 5.2 9.3c-.6.1-1.3-.2-1.4-.8-.2-.6.1-1.2.7-1.4 4.2-1.3 11.3-1 15.7 1.6.5.3.7 1 .4 1.5-.3.6-1 .8-1.5.4z" />
    </svg>
  )
);

const BrandYoutube = React.forwardRef(
  ({ color = "#ff0000", size = 24, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1-1.9-.5-9.4-.5-9.4-.5s-7.5 0-9.4.5C1.6 4.4.8 5.2.5 6.2 0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  )
);

const Icons = {
  BrandSpotify,
  BrandAppleMusic,
  BrandYoutube,
  // Feather Icons
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Disc,
  Download,
  ExternalLink,
  MapPin,
  Minus,
  Plus,
  X,
  Youtube,
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
