import React from "react";
import BlockContent from "@sanity/block-content-to-react";

import Link from "../components/link";
import Heading from "../components/heading";
import Text from "../components/text";

const blocks = {
  h1: props => <Heading as="h1" {...props} />,
  h2: props => <Heading as="h2" {...props} />,
  h3: props => <Heading as="h3" {...props} />,
  display1: props => <Text variant="display1" {...props} />,
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
  },
  marks: {
    link: withMarkProps(Link),
    internalLink: props => {
      const slug = props.mark.reference.content.main.slug.current;
      return withMarkProps(Link)({ ...props, to: `/${slug}` });
    },
  },
};

export default serializer;
