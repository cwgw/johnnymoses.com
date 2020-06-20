// import React from 'react'
import S from "@sanity/desk-tool/structure-builder";

import {
  ConfigMenu,
  ProductMenuItem,
  // ProductVariantParent,
  CollectionMenuItem,
  PageMenuItem,
  EventMenuItem,
} from "./structure/index";

//
// === Structure ===
//

export default () => {
  return S.list().title("Content").items([
    ConfigMenu,
    PageMenuItem,
    CollectionMenuItem,
    ProductMenuItem,
    EventMenuItem,
    // ProductVariantParent,
  ]);
};
