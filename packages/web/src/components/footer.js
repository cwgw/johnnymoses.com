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
                <Link href={getHref(item)} variant="footer">
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
