/** @type {import('webpack').Configuration} */

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: {
    bundle: [path.join(process.cwd(), 'source/client')]
  },
  output: {
    path: path.join(process.cwd(), 'public/client'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'source/client/index.html')
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }]
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  devServer: {
    hot: true,
    liveReload: true
  },
  resolve: {
    alias: {
      client: path.join(process.cwd(), 'source/client')
    }
  },
  stats: {
    warningsFilter: [
      /Sass @import rules are deprecated/,
      /Deprecation Warning.*sass-loader/,
      /Module Warning.*sass-loader/
    ]
  }
};
