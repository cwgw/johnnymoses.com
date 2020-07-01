// import React from 'react';
import S from "@sanity/desk-tool/structure-builder";
// import IframePreview from "../src/components/previews/iframe";
import Page from "../src/components/previews/page";
// import Emoji from 'a11y-react-emoji'

// const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='📄' />

export const PageMenuItem = S.listItem()
  .title("Pages")
  // .icon(Icon)
  .child(
    S.documentTypeList("page")
      .title("Pages")
      .menuItems(S.documentTypeList("page").getMenuItems())
      .filter("_type == $type")
      .params({ type: "page" })
      .child((...args) => {
        const documentId = args[0];
        return S.document()
        .documentId(documentId)
        .schemaType("page")
        .views([
          S.view.form(),
          // S.view
          // .component(IframePreview)
          //   .options({
          //     previewURL: "https://johnnymoses-com-1628856122.gtsb.io",
          //   })
          //   .title("Web Preview"),
          S.view.component(Page)
            .title("Web Preview"),
          ])
      })
  );
