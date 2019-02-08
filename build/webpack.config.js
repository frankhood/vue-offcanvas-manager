const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Webpack plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const NODE_ENV = process.env.NODE_ENV

// Development environment
const devEnv = () => (NODE_ENV === 'development')

const webpackConfig = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: devEnv() ? 'vue-offcanvas-manager.js' : 'vue-offcanvas-manager.min.js',
    library: 'VueOffcanvasManager',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    gsap: {
      commonjs: 'gsap',
      commonjs2: 'gsap',
      amd: 'gsap',
      root: 'gsap'
    },
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'vue'
    },
    vuex: {
      commonjs: 'vuex',
      commonjs2: 'vuex',
      amd: 'vuex',
      root: 'vuex'
    }
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  mode: devEnv() ? 'development' : 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        isStaging: (NODE_ENV === 'development' || NODE_ENV === 'staging'),
        NODE_ENV: `"${NODE_ENV}"`
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'head'
    })
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      src: path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      { // Vue components
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      { // Javascript
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  devServer: {
    hot: true
  }
}

module.exports = webpackConfig
