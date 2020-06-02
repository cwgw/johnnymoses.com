/** @jsx jsx */
import { jsx } from "theme-ui";

const Footer = () => (
  <footer
    sx={{
      textAlign: "center",
      py: 5,
    }}
  >
    © {new Date().getFullYear()}, Built with
    {` `}
    <a href="https://www.gatsbyjs.org">Gatsby</a>
  </footer>
);

export default Footer;
