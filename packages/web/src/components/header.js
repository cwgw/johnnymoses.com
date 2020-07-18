/** @jsx jsx */
import { jsx } from "theme-ui";
import PropTypes from "prop-types";

import { useCartCount } from "../context/shopifyClient";

import Flex from "./flex";
import Link from "./link";

const getHref = ({ link, url }) => {
  if (link) {
    return `/${link.content.main.slug.current}`;
  }

  return url;
};

// const NavItem = ({ title, item})

const Header = ({ navItems, siteTitle }) => {
  const cartCount = useCartCount();
  // console.log({ navItems });

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
          <Link to="/cart" variant="banner">
            Cart ({cartCount})
          </Link>
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
