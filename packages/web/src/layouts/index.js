/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/core";
import { graphql, useStaticQuery } from "gatsby";

import { globalStyles } from "@johnnymoses.com/theme";
import { SanityClientProvider } from "../context/sanityClient";
import { StoreContextProvider } from "../context/shopifyClient";
import { NotificationContextProvider } from "../context/notifications";

import Flex from "../components/flex";
import Header from "../components/header";
import Footer from "../components/footer";
import SkipNavLink from "../components/skipNavLink";
import Notifications from "../components/notifications";

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
            _key
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
            _key
            title
            url: link
          }
          ... on SanityMenuItem {
            _key
            title
            items {
              ... on SanityInternalLink {
                _key
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
                _key
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
    <SanityClientProvider>
      <StoreContextProvider>
        <NotificationContextProvider>
          <React.Fragment>
            <SkipNavLink mainId="main" />
            <Global styles={globalStyles} />
            <Flex flexDirection="column" flexWrap="nowrap" minHeight="100vh">
              <Header navItems={headerNavItems} siteTitle={siteTitle} />
              <main id="main" role="main">
                {children}
              </main>
              <Footer navItems={footerNavItems} mt="auto" />
              <Notifications />
            </Flex>
          </React.Fragment>
        </NotificationContextProvider>
      </StoreContextProvider>
    </SanityClientProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
