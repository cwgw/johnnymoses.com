require("dotenv").config({
  path: `../.env.${process.env.NODE_ENV}`,
});

module.exports = {
  stories: ["../stories/**/*.stories.{js,mdx}"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
  webpackFinal: async config => {
    // Add gatsby alias to fix linked local packages problem
    config.resolve.alias.gatsby = require.resolve('gatsby');
    return config;
  },
};
