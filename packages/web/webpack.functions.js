// const path = require('path');
const webpack = require("webpack");

module.exports = {
  // externals: {
  // 	canvas: "commonjs canvas",
  // },
  plugins: [new webpack.IgnorePlugin(/canvas/)],
  // module: {
  // 	rules: [
  // 		{
  // 			include: path.resolve(__dirname, "node_modules/canvas"),
  // 			use: "null-loader"
  // 		}
  // 	],
  // },
  mode: "production",
};
