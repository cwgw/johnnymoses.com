/** @jsx jsx */
import { jsx } from "theme-ui";
import PropTypes from "prop-types";

const propTypes = {
  mainId: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  mainId: "main",
  children: "Skip to content",
};

const SkipNavLink = ({ mainId, children }) => (
  <a href={`#${mainId}`} sx={{ variant: "links.skipNav" }}>
    {children}
  </a>
);

SkipNavLink.propTypes = propTypes;

SkipNavLink.defaultProps = defaultProps;

export default SkipNavLink;
