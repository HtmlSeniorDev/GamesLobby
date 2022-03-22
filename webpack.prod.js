const CopyPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: paths.appPublic,
          to: paths.appBuild,
          filter: resourcePath => resourcePath !== paths.appHtml,
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
      },
    ],
  },
});
