import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import get from "lodash/get";

import Button from "../components/button";
import Heading from "../components/heading";
import Icon from "../components/icon";
import Link from "../components/link";
import Text from "../components/text";

const blocks = {
  h1: props => <Heading as="h1" {...props} />,
  h2: props => <Heading as="h2" {...props} />,
  h3: props => <Heading as="h3" {...props} />,
  normal: props => <Text as="p" {...props} />,
  display1: props => <Text as="p" variant="display1" {...props} />,
  display2: props => <Text as="p" variant="display2" {...props} />,
};

const BlockRenderer = props => {
  const element = blocks[props.node.style];
  if (element) {
    return React.createElement(element, props);
  }

  return BlockContent.defaultSerializers.types.block(props);
};

const withMarkProps = Component => ({
  mark: { _key, _type, markKey, ...mark },
  ...props
}) => <Component {...mark} {...props} />;

const serializer = {
  types: {
    block: BlockRenderer,
    button: ({ node }) => {
      const { text, href, variant, icon } = node;
      const to = get(node, "to.content.main.slug.current", null);
      return (
        <Text as="p">
          <Button variant={variant} to={to ? `/${to}` : href}>
            {icon && <Icon icon={icon} />}
            {text}
          </Button>
        </Text>
      );
    },
  },
  marks: {
    link: withMarkProps(Link),
    internalLink: props => {
      const slug = props.mark.reference?.content?.main?.slug?.current;
      return withMarkProps(Link)({ ...props, to: `/${slug}` });
    },
    lushootseed: props => {
      return withMarkProps(Text)({
        ...props,
        as: "span",
        sx: { fontFamily: "lushootseed" },
      });
    },
  },
};

export default serializer;
