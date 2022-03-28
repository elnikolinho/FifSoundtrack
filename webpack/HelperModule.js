const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  webpack,
  MiniCssExtractPlugin,
  HtmlWebpackPlugin,
  path,
  CleanWebpackPlugin,
}
