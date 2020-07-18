/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/core";
import { graphql, useStaticQuery } from "gatsby";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";

import Header from "../components/header";
import Footer from "../components/footer";
import { SanityClientProvider } from "../context/sanityClient";
import { StoreContextProvider } from "../context/shopifyClient";
import { globalStyles } from "@johnnymoses.com/theme";

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
            title
          }
        }
      }
      mainMenu: sanityMenu(slug: { current: { eq: "main" } }) {
        items {
          ... on SanityInternalLink {
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
          ... on SanityExternalLink {
            title
            url: link
          }
          ... on SanityMenuItem {
            title
            items {
              ... on SanityInternalLink {
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
              ... on SanityExternalLink {
                title
                url: link
              }
            }
          }
        }
      }
      footerMenu: sanityMenu(slug: { current: { eq: "footer" } }) {
        _rawItems(resolveReferences: { maxDepth: 9 })
      }
    }
  `);

  const headerNavItems = data.mainMenu?.items || [];
  const footerNavItems = data.footerMenu?._rawItems || [];
  const siteTitle = data.sanitySiteGlobal.content.metaInformation.title;

  return (
    <StoreContextProvider>
      <SanityClientProvider {...sanityConfig}>
        <React.Fragment>
          <SkipNavLink sx={{ variant: "skipNav" }} />
          <Global styles={globalStyles} />
          <Header navItems={headerNavItems} siteTitle={siteTitle} />
          <SkipNavContent />
          <main>{children}</main>
          <Footer navItems={footerNavItems} />
        </React.Fragment>
      </SanityClientProvider>
    </StoreContextProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
