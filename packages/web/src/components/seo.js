import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, title }) {
  const data = useStaticQuery(graphql`
    {
      sanitySiteGlobal {
        content {
          metaInformation {
            metaKeywords
            metaTitle
            metaDescription
            opengraphTitle
            opengraphDescription
            twitterTitle
            twitterDescription
          }
        }
      }
    }
  `);

  const metadata = data.sanitySiteGlobal?.content?.metaInformation || {};
  const metaTitle = title || metadata.metaTitle;
  const metaDescription = description || metadata.metaDescription;
  const metaKeywords = metadata.metaKeywords;
  const opengraphTitle = metadata.opengraphTitle || metaTitle;
  const opengraphDescription = metadata.opengraphDescription || metaDescription;
  const twitterTitle = metadata.twitterTitle || metaTitle;
  const twitterDescription = metadata.twitterDescription || metaDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${metadata.metaTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: metaKeywords,
        },
        {
          property: `og:title`,
          content: opengraphTitle,
        },
        {
          property: `og:description`,
          content: opengraphDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        // {
        //   name: `twitter:creator`,
        //   content: site.author,
        // },
        {
          name: `twitter:title`,
          content: twitterTitle,
        },
        {
          name: `twitter:description`,
          content: twitterDescription,
        },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
