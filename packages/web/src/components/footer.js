/** @jsx jsx */
import { jsx } from "theme-ui";
import { useStaticQuery, graphql } from "gatsby";

import { Box, Flex, Link } from "./common";

const getHref = ({ _type, link }) => {
  if (_type === "internalLink") {
    return `/${link.content.main.slug.current}`;
  }

  return link;
};

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      sanityMenu(slug: { current: { eq: "footer" } }) {
        items {
          ... on SanityInternalLink {
            _key
            _type
            title
            link {
              content {
                main {
                  slug {
                    current
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const navItems = data.sanityMenu?.items || [];

  return (
    <footer>
      <Box
        sx={{
          width: "full",
          mx: "auto",
          textAlign: "center",
        }}
      >
        <nav>
          <Flex
            as="ul"
            sx={{
              ml: 0,
              pl: 0,
              listStyle: "none",
            }}
          >
            {navItems.map(({ _key, title, ...item }) => (
              <li key={_key}>
                <Link href={getHref(item)}>{title}</Link>
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
