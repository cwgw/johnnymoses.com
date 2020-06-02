import React from "react";
import { Link as UILink } from "theme-ui";
import { Link as GatsbyLink } from "gatsby";

const Link = ({ to, href, ...props }) => {
  const isInternal = /^\/(?!\/)/.test(to);

  if (isInternal) {
    return <UILink as={GatsbyLink} to={to} {...props} />;
  }

  return (
    <UILink
      as="a"
      href={to || href}
      rel="noreferrer"
      target="_blank"
      {...props}
    />
  );
};

export default Link;
