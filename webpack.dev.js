const StyleLintPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: paths.appPublic,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new StyleLintPlugin({
      configFile: paths.appStyleLintConfig,
      context: 'src',
      files: '**/*.css',
      failOnError: false,
      quiet: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }, 'eslint-loader'],
      },
    ],
  },
});
