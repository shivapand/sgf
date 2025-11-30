/** @type {import('webpack').Configuration} */

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const pathFragmentDefinition = {
  cwd: process.cwd(),
  source: 'source',
  target: 'target',
  client: 'client'
};

const pathFragmentSource = path.join(
  ...(() => {
    const { cwd, source, client } = pathFragmentDefinition;

    return [cwd, source, client];
  })()
);

const pathFragmentTarget = path.join(
  ...(() => {
    const { cwd, target, client } = pathFragmentDefinition;

    return [cwd, target, client];
  })()
);

const nodeModulesPregExp = /node_modules/;

const exclude = [nodeModulesPregExp];

export default (_, { mode }) => {
  const modeDevelopmentFlag = mode === 'development';

  const styleLoader = modeDevelopmentFlag
    ? 'style-loader'
    : MiniCssExtractPlugin.loader;

  return {
    entry: { bundle: [pathFragmentSource] },
    output: {
      path: pathFragmentTarget,
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(pathFragmentSource, 'index.html')
      }),
      new MiniCssExtractPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude,
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
          exclude,
          use: [styleLoader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.css$/,
          use: [styleLoader, 'css-loader']
        }
      ]
    },
    devServer: { hot: true, liveReload: true },
    resolve: { alias: { client: pathFragmentSource } },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: nodeModulesPregExp,
            chunks: 'initial',
            name: 'vendor.bundle'
          }
        }
      }
    },
    devtool: modeDevelopmentFlag ? 'eval-source-map' : 'source-map',
    stats: {
      warningsFilter: [
        /Sass @import rules are deprecated/,
        /Deprecation Warning.*sass-loader/,
        /Module Warning.*sass-loader/
      ]
    }
  };
};
