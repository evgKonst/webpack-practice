const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeAssetsCssPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  }

  if (isProd) {
    config.minimizer = [
        new OptimizeAssetsCssPlugin(),
        new TerserWebpackPlugin()
    ]
  }
  return config
}

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    analytics: './analytics.js'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  optimization: optimization(),
  plugins: [
      new HTMLWebpackPlugin({
        template: ["./index.html"],
        minify: {
          collapseWhitespace: isProd
        }
      }),
      new CleanWebpackPlugin(),
      new MiniCSSExtractPlugin({
        filename: filename('css')
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/favicon.ico'),
            to: path.resolve(__dirname, 'dist')
          }
        ]
      })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use:  [MiniCSSExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff)$/,
        use: ['file-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
                "@babel/preset-env",
            ]
          }
        }
      }
    ]
  }

}
