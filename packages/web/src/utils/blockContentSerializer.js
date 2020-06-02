import React from "react";
import { Styled } from "theme-ui";
import BlockContent from "@sanity/block-content-to-react";

import { DisplayText, Link } from "../components/common";

const blocks = {
  h1: Styled.h1,
  h2: Styled.h2,
  h3: Styled.h3,
  display1: DisplayText,
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
