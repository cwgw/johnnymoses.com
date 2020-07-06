import S from "@sanity/desk-tool/structure-builder";
import IframePreview from "../src/components/previews/iframePreview";

const remoteURL = "https://johnnymoses.netlify.app/preview";
const localURL = "http://localhost:8000/preview";
const previewURL =
  window.location.hostname === "localhost" ? localURL : remoteURL;

export const ProductMenuItem = S.listItem()
  .title("Products")
  .child(
    S.documentList()
      .filter('_type == "product" || _type == "productThirdParty"')
      .title("Products")
      .child(documentId => {
        return S.document()
          .documentId(documentId)
          .views([
            S.view.form(),
            S.view
              .component(IframePreview)
              .options({ previewURL })
              .title("Web Preview"),
          ]);
      })
  );
