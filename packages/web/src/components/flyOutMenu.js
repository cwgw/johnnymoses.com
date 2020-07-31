/** @jsx jsx */
import { jsx } from "theme-ui";
// import { animated, useSpring } from 'react-spring'

import useFlyOutMenu from "../hooks/useFlyOutMenu";

import Link from "./link";
import Box from "./box";

const FlyOutMenuItem = ({ title, badge, items, ...props }) => {
  const {
    isActive,
    isExpanded,
    getParentLinkProps,
    getArrowProps,
    getChildMenuProps,
  } = useFlyOutMenu();

  // console.log("FlyOutMenu rendering");

  return (
    <Box
      {...props}
      sx={{
        position: "relative",
      }}
    >
      <Link
        variant="links.banner"
        href="#"
        children={title}
        {...getParentLinkProps()}
      />
      <Box
        as="ul"
        variant="flyoutMenu.list"
        sx={{
          transition: "all 200ms",
          zIndex: "popover",
          my: 2,
        }}
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
};

export default FlyOutMenuItem;
