/** @jsx jsx */
import { jsx } from "theme-ui";
import PropTypes from "prop-types";

import { useCartCount } from "../context/shopifyClient";

import Flex from "./flex";
import Link from "./link";
import Box from "./box";
import useFlyoutMenuItem from "../hooks/useFlyoutMenu";
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
          {navItems.map(({ _key, ...item }) => {
            if (item.items && item.items.length > 0) {
              return (
                <FlyOutMenu
                  {...item}
                  key={_key}
                  as="li"
                  badge={
                    item.title.toLowerCase() === "store" ? cartCount : null
                  }
                />
              );
            }

            const { title, link, url } = item;
            const href = link ? "/" + link.content.main.slug.current : url;
            return (
              <li key={_key}>
                <Link to={href} variant="banner" children={title} />
              </li>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

function FlyOutMenu({ title, badge, items, ...props }) {
  const {
    getParentLinkProps,
    getArrowProps,
    getChildMenuProps,
  } = useFlyoutMenuItem();

  console.log("FlyOutMenu rendering");

  return (
    <Box {...props}>
      <Link
        variant="links.banner"
        href="#"
        children={title}
        {...getParentLinkProps()}
      />
      <Box
        as="ul"
        variant="flyoutMenu.list"
        sx={{ zIndex: "popover" }}
        {...getChildMenuProps()}
      >
        <Box as="span" {...getArrowProps()} />
        {items.map(item => {
          const itemHref = item.link
            ? "/" + item.link.content.main.slug.current
            : item.url;

          return (
            <Box as="li" key={item._key}>
              <Link to={itemHref} variant="flyoutMenu.link">
                {item.title}
                {/^cart$/i.test(item.title) && ` (${badge})`}
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

Header.propTypes = propTypes;

Header.defaultProps = defaultProps;

export default Header;
