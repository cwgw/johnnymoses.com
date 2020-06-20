/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/core";

import Header from "../components/header";
import Footer from "../components/footer";

import fonts from "../assets/fonts";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Global
        styles={{
          ":root": fonts.map(font => ({ "@font-face": font })),
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
