// import React from 'react';
import S from "@sanity/desk-tool/structure-builder";
import IframePreview from "../src/components/previews/iframePreview";

const remoteURL = "https://johnnymoses.netlify.app/preview";
const localURL = "http://localhost:8000/preview";
const previewURL =
  window.location.hostname === "localhost" ? localURL : remoteURL;

export const PageMenuItem = S.listItem()
  .title("Pages")
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
            S.view
              .component(IframePreview)
              .options({ previewURL })
              .title("Web Preview"),
          ]);
      })
  );
