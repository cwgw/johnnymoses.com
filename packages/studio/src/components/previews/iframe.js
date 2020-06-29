import React from "react";
import PropTypes from "prop-types";

const assembleProjectUrl = ({ displayed, options }) => {
  const slug = displayed.content.main.slug;
  const previewURL = options.previewURL;
  if (!slug || !previewURL) {
    console.warn("Missing slug or previewURL", { slug, previewURL });
    return "";
  }
  if (slug.current === "home") {
    return previewURL;
  }

  return `${previewURL}/${slug.current}`;
};

class IframePreview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    document: null,
  };

  render() {
    const { options } = this.props;
    const { displayed } = this.props.document;
    if (!displayed) {
      return (
        <div>
          <p>There is no document to preview</p>
        </div>
      );
    }

    const url = assembleProjectUrl({ displayed, options });

    if (!url) {
      return (
        <div>
          <p>Hmm. Having problems constructing the web front-end URL.</p>
        </div>
      );
    }

    return (
      <iframe
        style={{ height: "100%", width: "100%" }}
        src={url}
        frameBorder={"0"}
      />
    );
  }
}

export default IframePreview;
