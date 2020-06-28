/** @jsx jsx */

import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import Box from './box'

const defaultProps = {
  variant: 'styles.a',
  className: null,
  to: null,
  href: null,
}

const propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
}

const Link = ({ to, href, ...props }) => {
  const url = to || href;
  const isInternal = /^\/(?!\/)/.test(url);
  const addlProps = isInternal ? {
    as: GatsbyLink,
    to: url,
  } : {
    as: 'a',
    href: url,
    rel: "noreferrer",
    target: "_blank",
  }

  return (
    <Box
      variant="styles.a"
      __themeKey="links"
      {...addlProps}
      {...props}
    />
  )
}

Link.propTypes = propTypes;

Link.defaultProps = defaultProps;

export default Link;
