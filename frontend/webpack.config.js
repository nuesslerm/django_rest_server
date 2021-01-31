/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './static/js'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  //  I want to remove the width & height attributes and keep the viewbox, by default it removes those.
                  removeViewBox: false,
                  // removeAttrs: true,
                  // mergePaths: false,
                },
              },
            },
          },
          'url-loader',
        ],
      },
      {
        test: /png|jpe?g|gif/i,
        use: 'url-loader',
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: { loader: 'file-loader' },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on react lib size
        NODE_ENV: '"production"',
      },
    }),
  ],
};
