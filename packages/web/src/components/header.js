/** @jsx jsx */
import { jsx } from "theme-ui";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Flex from "./flex";
import Link from "./link";

const getHref = ({ _type, link }) => {
  if (_type === "internalLink") {
    return `/${link.content.main.slug.current}`;
  }

  return link;
};

const Header = () => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteGlobal {
        content {
          metaInformation {
            metaTitle
          }
        }
      }
      sanityMenu(slug: { current: { eq: "main" } }) {
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
  const siteTitle = data.sanitySiteGlobal.content.metaInformation.metaTitle;

  return (
    <header role="banner">
      <div
        sx={{
          px: 4,
          mx: "auto",
          flexWrap: "wrap",
          maxWidth: "full",
        }}
      >
        <Flex
          as="nav"
          mx="auto"
          sx={{
            mx: -2,
          }}
        >
          <Link to="/" children={siteTitle} variant="banner" mr="auto" />
          <Flex
            as="ul"
            sx={{
              ml: 0,
              pl: 0,
              maxWidth: "100%",
              listStyle: "none",
              overflowX: "scroll",
              scrollbarWidth: "none",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {navItems.map(({ _key, title, ...item }) => (
              <li key={_key} sx={{ p: 0 }}>
                <Link to={getHref(item)} variant="banner">
                  {title}
                </Link>
              </li>
            ))}
          </Flex>
        </Flex>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
