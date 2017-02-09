// Depends
var path = require('path');
var webpack = require('webpack');
var Manifest = require('manifest-revision-webpack-plugin');
var TextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlPlugin = require('html-webpack-plugin');
module.exports = [{
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'draw2d-wrapper.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    alias: {
      _svg: path.join('examples', 'assets', 'svg'),
      _fonts: path.join('examples', 'assets', 'fonts'),
      _modules: path.join('examples', 'modules'),
      _images: path.join('examples', 'assets', 'images'),
      _stylesheets: path.join('examples', 'assets', 'stylesheets'),
      _templates: path.join('examples', 'assets', 'templates')
    }
  },
  // modules resolvers
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: '/mode_modules/'
    }, {
      test: /\.pug$/,
      use: `pug-html-loader?basedir=${__dirname}`
    }, {
      test: /\.css$/,
      use: ['css-to-string-loader', 'style-loader', 'css-loader']
    }, {
      test: /\.styl$/,
      use: ['css-to-string-loader', 'style-loader', 'css-loader', 'stylus-loader']
    }, {
      test: /\.html$/,
      use: 'html-loader'
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      use: 'file-loader'
    }, {
      test: /\.svg$/,
      use: 'file-loader'
    }, {
      loader: 'babel',
      test: /\.js$/,
      query: {
        presets: ['es2015'],
        ignore: ['node_modules']
      }
    }]
  },
  // module: {
  //   preLoaders: [{
  //     test: /\.json$/,
  //     loader: 'json-loader'
  //   }],
  //   loaders: [{
  //     test: /\.pug$/,
  //     loader: 'pug'
  //   }, {
  //     test: /\.html$/,
  //     use: 'html-loader'
  //   }, {
  //     test: /\.styl$/,
  //     loader: TextPlugin.extract('style', 'css!postcss!stylus')
  //   }, {
  //     test: /\.(css|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
  //     use: 'file-loader'
  //     //   loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]']
  //   }, {
  //     loader: 'babel',
  //     test: /\.js$/,
  //     query: {
  //       presets: ['es2015'],
  //       ignore: ['node_modules', 'bower_components', 'draw2d']
  //     }
  //   }]
  // },
  // // post css
  postcss: [autoprefixer({
    browsers: ['last 5 versions']
  })],
  // load plugins
  plugins: [
    //   new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.[hash].js'),
    //   new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    // new TextPlugin('assets/css/[name].[chunkhash].css'),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery"
    // }),
    // new webpack.ProvidePlugin({
    //   PF: "pathfinding",
    //   "window.pathfinding": "pathfinding"
    // }),
    // new webpack.ProvidePlugin({
    //   Raphael: "raphael",
    //   "window.Raphael": "raphael"
    // }),
    // new webpack.ProvidePlugin({
    //   Tweenable: "shifty",
    //   "window.Tweenable": "shifty"
    // }),
    // new Manifest(path.join('/config', 'manifest.json'), {
    //   rootAssetPath: rootAssetPath,
    //   ignorePaths: ['.DS_Store']
    // }),
    // create instance for entrypoint index.html building
    new HtmlPlugin({
      title: 'draw2d wrapper',
      template: path.join('examples', 'index.html')
    })
  ]
}];
