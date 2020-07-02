import React from "react";
import PropTypes from "prop-types";
import Box from "./box";
import { useLocalComponent } from "../context/components";

const defaultProps = {
  variant: "styles.a",
  className: null,
  to: null,
  href: null,
};

const propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
};

const Link = ({ to, href, ...props }) => {
  const url = to || href;
  const isInternal = /^\/(?!\/)/.test(url);
  const { link } = useLocalComponent();
  const addlProps = isInternal
    ? {
        as: link || "a",
        to: url,
      }
    : {
        as: "a",
        href: url,
        rel: "noreferrer",
        target: "_blank",
      };

  return (
    <Box variant="styles.a" __themeKey="links" {...addlProps} {...props} />
  );
};

Link.propTypes = propTypes;

Link.defaultProps = defaultProps;

export default Link;
