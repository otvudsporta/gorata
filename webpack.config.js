const autoprefixer = require('autoprefixer');
const path = require('path');
const env = require('var');
const { define } = require('var/webpack');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NullPlugin = require('webpack-null-plugin');
const PwaManifestPlugin = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

const BUILD_DIR = './build';
const APP_DIR = './src';

const dependencies = require('./package.json').dependencies;
const vendor = Object.keys(dependencies).filter((dependency) => dependency.indexOf('@types/') === -1);

module.exports = ({ production } = {}) => ({
  devtool: production ? false : 'inline-source-map',
  context: process.cwd(),
  entry: {
    app: `./${APP_DIR}/app.ts`,
    vendor
  },
  output: {
    publicPath: '/',
    path: path.resolve(BUILD_DIR),
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].js.map'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss']
  },
  module: {
    rules: [
      // Scripts
      { test: /\.tsx?$/, loader: 'ts-loader' },

      // Styles
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },

      // Assets
      {
        test: /\.(jpe?g|ico|gif|png|svg|wav|mp3|json)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    production ? new CleanWebpackPlugin([`${BUILD_DIR}/*`]) : new NullPlugin(),

    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      m: 'mithril'
    }),
    new webpack.DefinePlugin({
      ...define(env),
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [
          autoprefixer({ browsers: ['last 3 versions', '> 1%'] })
        ]
      }
    }),

    // `contenthash` is specific to this plugin, we would typically use `chunkhash`
    new ExtractTextPlugin('styles.[contenthash].css'),
    new HtmlWebpackPlugin({ template: `./${APP_DIR}/index.ejs` }),
    new PwaManifestPlugin({
      short_name: 'Отвъд Спорта',
      name: 'Отвъд Спорта',
      background_color: '#0064b1',
      theme_color: '#0064b1',
      start_url: '/',
      display: 'standalone',
      orientation: 'portrait',
      icons: [{
        src: path.resolve(APP_DIR, 'assets', 'logo.png'),
        sizes: [48, 96, 128, 192, 256, 384, 512]
      }],

      // Custom options
      publicPath: undefined
    }),
    new WorkboxPlugin({
      globDirectory: BUILD_DIR,
      globPatterns: ['**/*.{html,js,css}'],
      swDest: path.resolve(BUILD_DIR, 'service-worker.js')
    })
  ]
});
