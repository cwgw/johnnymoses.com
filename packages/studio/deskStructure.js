// import React from 'react'
import S from "@sanity/desk-tool/structure-builder";

import {
  ConfigMenu,
  ProductMenuItem,
  ProductVariantParent,
  CollectionMenuItem,
  PageMenuItem,
  EventMenuItem,
  PostMenuItem,
} from "./structure/index";

//
// === Structure ===
//

export default () => {
  return S.list()
    .title("Content")
    .items([
      ConfigMenu,
      PageMenuItem,
      PostMenuItem,
      CollectionMenuItem,
      ProductMenuItem,
      EventMenuItem,
      ProductVariantParent,
    ]);
};
