/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/core";
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby";

import {
  Header,
  Footer,
  ComponentProvider,
  SanityClientProvider,
  globalStyles,
} from "@johnnymoses.com/components";

const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
};

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteGlobal {
        content {
          metaInformation {
            metaTitle
          }
        }
      }
      mainMenu: sanityMenu(slug: { current: { eq: "main" } }) {
        items {
          ... on SanityInternalLink {
            _key
            _type
            title
            link {
              content {
                main {
                  slug {
                    current
                  }
                }
              }
            }
          }
        }
      }
      footerMenu: sanityMenu(slug: { current: { eq: "footer" } }) {
        items {
          ... on SanityInternalLink {
            _key
            _type
            title
            link {
              content {
                main {
                  slug {
                    current
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const headerNavItems = data.mainMenu?.items || [];
  const footerNavItems = data.footerMenu?.items || [];
  const siteTitle = data.sanitySiteGlobal.content.metaInformation.metaTitle;

  return (
    <SanityClientProvider {...sanityConfig}>
      <ComponentProvider value={{ link: GatsbyLink }}>
        <React.Fragment>
          <Global styles={globalStyles} />
          <Header navItems={headerNavItems} siteTitle={siteTitle} />
          <main>{children}</main>
          <Footer navItems={footerNavItems} />
        </React.Fragment>
      </ComponentProvider>
    </SanityClientProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
