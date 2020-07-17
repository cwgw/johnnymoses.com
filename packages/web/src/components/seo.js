import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import { useSanityClient } from '../context/sanityClient'
import { resolve as urlResolve } from '../utils/url'

function SEO({ lang, meta: _meta }) {
  const data = useStaticQuery(graphql`
    {
      sanitySiteGlobal {
        _rawContent(resolveReferences: { maxDepth: 9 })
      }
    }
  `);

  const { imgUrl } = useSanityClient();

  const siteMeta = data.sanitySiteGlobal._rawContent.metaInformation || {};  
  const meta = { ...siteMeta, ..._meta };
  const social = data.sanitySiteGlobal._rawContent.social;

  const siteTitle = data.sanitySiteGlobal._rawContent.siteTitle
  const siteHostname = data.sanitySiteGlobal._rawContent.siteHostname.current
  const siteUrl = urlResolve(siteHostname)

  const sameAs = social
    ? Object.entries(social).filter(a => !(a[0].startsWith('_'))).map(a => a[1])
    : [];

  const title = meta.title || siteTitle;
  const titleComplement = meta.title === siteMeta.title ? siteMeta.description : siteMeta.title;
  
  const description = {
    name: 'description',
    content: meta.description,
  }

  const keywords = meta.metaKeywords && {
    name: 'keywords',
    content: meta.metaKeywords,
  };

  const image = meta.image && {
    name: 'image',
    content: imgUrl(meta.image).width(1024).height(1024).url()
  }

  const ogType = {
    property: `og:type`,
    content: `website`,
  };

  const ogTitle = {
    property: `og:title`,
    content: meta.opengraphTitle || meta.title,
  };

  const ogDescription = {
    property: `og:description`,
    content: meta.opengraphDescription || meta.description,
  };

  const ogImage = (meta.opengraphImage || meta.image) && {
    property: 'og:image',
    content: imgUrl(meta.opengraphImage || meta.image).width(1200).height(630).url(),
  }

  const ogSiteName = {
    property: 'og:site_name',
    content: siteMeta.title
  }

  const ogURL = {
    property: 'og:url',
    content: siteUrl
  }

  const twitterCard = {
    name: `twitter:card`,
    content: `summary`,
  };

  const twitterTitle = {
    name: `twitter:title`,
    content: meta.twitterTitle || meta.title,
  };

  const twitterDescription = {
    name: 'twitter:description',
    content: meta.twitterDescription || meta.description
  };
  
  const twitterimage = (meta.twitterImage || meta.image) && {
    name: 'twitter:image:src',
    content: imgUrl(meta.twitterImage || meta.image).width(1024).height(512).url()
  };

  const metaTags = ([
    description,
    keywords,
    image,
    ogType,
    ogTitle,
    ogDescription,
    ogImage,
    ogSiteName,
    ogURL,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterimage
  ]).filter(Boolean)

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${titleComplement}`}
      meta={metaTags}
      script={[
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebSite",
            name: siteTitle,
            url: siteUrl,
            image: image && image.content,
            sameAs: sameAs
          })
        }
      ]}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: {},
  description: null,
  title: null,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.object,
  title: PropTypes.string,
};

export default SEO;
