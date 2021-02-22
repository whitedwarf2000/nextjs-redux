require('dotenv').config();
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@next/bundle-analyzer');

/* Enable code below to analyze bundle size */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true,
// });

const { NODE_ENV, VIEWPORT_ENV } = process.env;

const nextConfig = {
  cssLoaderOptions: {
    url: false,
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  plugin: [
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
  publicRuntimeConfig: {
    NODE_ENV,
    VIEWPORT_ENV,
    staticFolder: '/public',
  },
};

module.exports = withPlugins([[withCSS], [withSass], [withBundleAnalyzer]], nextConfig);
