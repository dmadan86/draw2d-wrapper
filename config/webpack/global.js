// Depends
var path = require('path');
var webpack = require('webpack');
var Manifest = require('manifest-revision-webpack-plugin');
var TextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlPlugin = require('html-webpack-plugin');
/**
 * Global webpack config
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
module.exports = function(_path) {
  // define local variables
  var dependencies = Object.keys(require(_path + '/package').dependencies);
  var rootAssetPath = _path + 'examples';
  // return objecy
  return {
    // entry points
    entry: {
      application: _path + '/index.js',
      vendors: dependencies
    },
    // output system
    output: {
      path: path.join(_path, 'dist'),
    //   filename: path.join('assets', 'js', '[name].[hash].js'),
      filename: 'draw2d-wrapper.js',
      chunkFilename: '[id].bundle.[chunkhash].js',
      publicPath: '/'
    },
    // resolves modules
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules'],
      alias: {
        _svg: path.join(_path, 'app', 'assets', 'svg'),
        _fonts: path.join(_path, 'app', 'assets', 'fonts'),
        _modules: path.join(_path, 'app', 'modules'),
        _images: path.join(_path, 'app', 'assets', 'images'),
        _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets'),
        _templates: path.join(_path, 'app', 'assets', 'templates')
      }
    },
    // modules resolvers
    module: {
      preLoaders: [{
        test: /\.json$/,
        loader: 'json-loader'
      }],
      loaders: [{
        test: /\.pug$/,
        loader: 'pug'
      }, {
        test: /\.styl$/,
        loader: TextPlugin.extract('style', 'css!postcss!stylus')
      }, {
        test: /\.(css|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
        loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]']
      },
    {
        loader: 'babel',
        test: /\.js$/,
        query: {
          presets: ['es2015'],
          ignore: ['node_modules', 'bower_components', 'draw2d']
        }
      }]
    },
    // post css
    postcss: [autoprefixer({
      browsers: ['last 5 versions']
    })],
    // load plugins
    plugins: [
    //   new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.[hash].js'),
    //   new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      new TextPlugin('assets/css/[name].[chunkhash].css'),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
      new webpack.ProvidePlugin({
        PF: "pathfinding",
        "window.pathfinding": "pathfinding"
      }),
      new webpack.ProvidePlugin({
        Raphael: "raphael",
        "window.Raphael": "raphael"
      }),
      new webpack.ProvidePlugin({
        Tweenable: "shifty",
        "window.Tweenable": "shifty"
      }),
      new Manifest(path.join(_path + '/config', 'manifest.json'), {
        rootAssetPath: rootAssetPath,
        ignorePaths: ['.DS_Store']
      }),
      // create instance for entrypoint index.html building
      new HtmlPlugin({
        title: 'draw2d wrapper',
        chunks: ['application', 'vendors'],
        filename: 'index.html',
        template: path.join(_path,  'examples', 'templates', 'layouts', 'index.html')
      })
    ]
  };
};
