/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/core";
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby";

import { Header, Footer, ComponentProvider, fonts } from "@johnnymoses.com/components";

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
    <ComponentProvider value={{ link: GatsbyLink }} >
      <React.Fragment>
        <Global
          styles={{
            ":root": fonts.map(font => ({ "@font-face": font })),
          }}
          />
        <Header navItems={headerNavItems} siteTitle={siteTitle} />
        <main>{children}</main>
        <Footer navItems={footerNavItems} />
      </React.Fragment>
    </ComponentProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
