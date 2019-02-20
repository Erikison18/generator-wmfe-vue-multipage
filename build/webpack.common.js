const path = require('path')
const utils = require('./utils')
// vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': utils.resolve('src'),
    }
  },
  externals: {
    zepto: "zepto",
    echarts: 'echarts',
    // swiper: 'swiper',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // {
      //   test: /\.(css|scss)(\?.*)?$/,
      //   loader: 'style-loader!css-loader!postcss-loader!sass-loader',
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-hot-middleware/client')],
        exclude: /node_modules/,
        options: {
          cacheDirectory: true // 开启缓存
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|.ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader插件
    // px自动转rem
    new webpack.LoaderOptionsPlugin({  
      options: {  
          postcss: function(){  
              return [  
                require('postcss-px2rem')({ remUnit: 100, propWhiteList: [] })
              ]  
          }  
      }  
    }),
  ] 
};