/**
 * Production config
 * @param  {String} _path Absolute path to application
 * @return {Object}       Object of proruction settings
 */
module.exports = function(_path) {
  return {
    context: _path,
    debug: false,
    devtool: 'cheap-source-map',
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader?presets[]=es2015'
    }],
    output: {
      publicPath: '/rambler-webpack-boilerplate/'
    }
  }
}
