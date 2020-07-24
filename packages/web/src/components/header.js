/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";

import { useCartCount } from "../context/shopifyClient";

import Flex from "./flex";
import Link from "./link";
import MenuButton from "./menuButton";
import Box from "./box";
// import Badge from "./badge";

const propTypes = {
  siteTitle: PropTypes.string,
};

const defaultProps = {
  siteTitle: ``,
};

const Header = ({ navItems, siteTitle }) => {
  const cartCount = useCartCount();

  return (
    <Box as="header" role="banner" variant="container">
      <Flex as="nav" aria-label="Main" py={2} px={4} mx={-2}>
        <Link to="/" children={siteTitle} variant="banner" mr="auto" />
        <Flex
          as="ul"
          ml={0}
          pl={0}
          maxWidth="100%"
          sx={{
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {navItems.map(({ _key, ...item }) => (
            <li key={_key}>
              <NavItem
                {...item}
                badge={item.title.toLowerCase() === "store" ? cartCount : null}
              />
            </li>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

function NavItem({ title, link, url, badge, items }) {
  if (items && items.length > 0) {
    return (
      <MenuButton
        value={badge ? <React.Fragment>{title}</React.Fragment> : title}
        variant="banner"
      >
        {items.map(item => {
          const itemHref = item.link
            ? "/" + item.link.content.main.slug.current
            : item.url;

          return (
            <Link key={item._key} to={itemHref}>
              {item.title}
              {/^cart$/i.test(item.title) && ` (${badge})`}
            </Link>
          );
        })}
      </MenuButton>
    );
  }

  const href = link ? "/" + link.content.main.slug.current : url;

  return (
    <Link to={href} variant="banner">
      {title}
    </Link>
  );
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
