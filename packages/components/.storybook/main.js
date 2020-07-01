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
};
