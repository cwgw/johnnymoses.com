/** @jsx jsx */
import { jsx } from "theme-ui";

import Box from "./box";
import Flex from "./flex";
import Link from "./link";

const getHref = ({ _type, link }) => {
  if (_type === "internalLink") {
    const slug = link.content.main.slug.current;
    return slug === "home" ? "/" : `/${slug}`;
  }

  return link;
};

const Footer = ({ navItems }) => {
  return (
    <footer>
      <Box
        sx={{
          width: "full",
          maxWidth: "100%",
          mx: "auto",
          px: 4,
          textAlign: "center",
        }}
      >
        <nav
          sx={{
            mx: -2,
          }}
        >
          <Flex
            as="ul"
            sx={{
              ml: 0,
              pl: 0,
              listStyle: "none",
              "li + li": {
                ml: 3,
              },
            }}
          >
            {navItems.map(({ _key, title, ...item }) => (
              <li key={_key}>
                <Link to={getHref(item)} variant="nav">
                  {title}
                </Link>
              </li>
            ))}
          </Flex>
        </nav>
        <p sx={{ px: 4 }}>© {new Date().getFullYear()}</p>
      </Box>
    </footer>
  );
};

export default Footer;
