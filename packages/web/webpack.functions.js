module.exports = {
	// externals: {
	// 	canvas: "commonjs canvas",
	// },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader',
      }
    ],
  },
	mode: "production",
};