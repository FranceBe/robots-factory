import { join, resolve } from 'path'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseDir = resolve(__dirname)
const HtmlWebPackPlugin = require('html-webpack-plugin')

import { Configuration } from './types/webpackConfig'

const htmlPlugin = new HtmlWebPackPlugin({
  filename: './index.html',
  template: './static/index.html',
})
const dev = process.env.NODE_ENV === 'development'
const port = Number(process.env.PORT) || 4000

export const config: Configuration = {
  devServer: {
    compress: true,
    hot: false,
    liveReload: false,
    port,
    static: {
      directory: join(baseDir, 'dist/src'),
    },
  },
  entry: resolve(baseDir, 'src', 'index.tsx'),
  mode: dev ? 'development' : 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: { loader: 'ts-loader' },
      },
      {
        loader: 'file-loader',
        options: {
          esModule: false,
          name: 'assets/images/[name].[ext]',
        },
        test: /\.(png|jpg|gif|ico|svg)$/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: { loader: 'url-loader?limit=100000' },
      },
      {
        exclude: /node_modules/,
        test: /\.ttf$/,
        use: { loader: 'file-loader?name=assets/fonts/[name].[ext]' },
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: resolve(baseDir, 'dist/src'),
    publicPath: '/',
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  plugins: [htmlPlugin, new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules', 'jest-config'],
  },
}

export default config
