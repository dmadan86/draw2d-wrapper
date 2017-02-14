var path = require('path'),
  webpack = require('webpack'),
  Manifest = require('manifest-revision-webpack-plugin'),
  TextPlugin = require('extract-text-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  HtmlPlugin = require('html-webpack-plugin');
module.exports = [{
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
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
  postcss: [autoprefixer({
    browsers: ['last 5 versions']
  })],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
    // new HtmlPlugin({
    //   // title: 'draw2d wrapper',
    //   // template: path.join('examples', 'index.html')
    // })
  ]
}];
