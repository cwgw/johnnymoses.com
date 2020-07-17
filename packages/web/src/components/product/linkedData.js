import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

import { resolve as urlResolve } from '../../utils/url';

function blocksToPlainText(blocks = []) {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map((child) => child.text).join('')
    })
    .join('\n\n')
}

const LinkedData = ({ main, shopify }) => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteGlobal {
        content {
          siteTitle
          siteHostname {
            current
          }
          routes {
            productRouteRoot {
              current
            }
          }
        }
      }
    }
  `);

  const siteTitle = get(
    data,
    'sanitySiteGlobal.content.siteTitle'
  );
  
  const hostname = get(
    data,
    'sanitySiteGlobal.content.siteHostname.current'
  );

  const siteUrl = urlResolve(hostname);

  const productRoute = get(
    data,
    'sanitySiteGlobal.content.routes.productRouteRoot.current'
  );

  const productPath = urlResolve(hostname, productRoute, main.slug.current);

  const doc = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: main.title,
    image: main.mainImage && main.mainImage.asset.url,
    description: main.productDescription && blocksToPlainText(main.productDescription),
    sku: shopify.defaultVariant.sku,
    mpn: shopify.defaultVariant.sku,
    brand: {
      "@type": "Brand",
      name: siteTitle,
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      url: productPath,
      priceCurrency: "USD",
      price: shopify.defaultVariant.price,
      itemCondition: "https://schema.org/UsedCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Brand",
        name: siteTitle,
        url: siteUrl,
        }
    }
  }
  
  return (
    <script type="application/ld+json">
      {JSON.stringify(doc)}
    </script>
  )  
}

export default LinkedData;
