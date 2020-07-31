// import React from 'react';
import S from "@sanity/desk-tool/structure-builder";

export const PostMenuItem = S.listItem()
  .title("News")
  .child(
    S.documentTypeList("post")
      .title("News Items")
      .menuItems(S.documentTypeList("post").getMenuItems())
      .filter("_type == $type")
      .params({ type: "post" })
      .child((...args) => {
        const documentId = args[0];
        return S.document().documentId(documentId).schemaType("post");
      })
  );
