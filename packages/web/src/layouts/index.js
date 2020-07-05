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
