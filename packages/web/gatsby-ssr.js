import React from "react";
import Layout from "./src/layouts";

export const wrapPageElement = ({ props, element }) => (
  <Layout {...props}>{element}</Layout>
);
