// import React from 'react';
import S from "@sanity/desk-tool/structure-builder";
// import Emoji from 'a11y-react-emoji'

// const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='🛍️' />

export const ProductMenuItem = S.listItem()
  .title("Products")
  // .icon(Icon)
  .child(
    S.documentTypeList("product")
      .title("Products")
      .menuItems(S.documentTypeList("product").getMenuItems())
      // .filter('_type == $type && subscription != true')
      .filter("_type == $type")
      .params({ type: "product" })
  );
