const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const path = require('path');

module.exports = {
  entry: [paths.appIndex],
  output: {
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].chunk.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new ForkTsCheckerWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
  ],
  module: {
    strictExportPresence: false,
    noParse: [/\.test\.tsx?$/],
    rules: [
      {
        test: /\.worker\.(c|m)?ts$/i,
        loader: 'worker-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: true } },
          { loader: 'css-loader', options: { modules: true } },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.css', '.png', '.jpg', 'json'],
  },
  stats: {
    builtAt: true,
    children: false,
    assets: false,
    logging: 'warn',
    modules: false,
    entrypoints: false,
    warningsFilter: /export .* was not found in/,
  },
};
