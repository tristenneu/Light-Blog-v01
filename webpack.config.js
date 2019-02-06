const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],

  output: {
    publicPath: '/',
    filename: './main.js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'public/img/[name].[ext]',
            outputPath: 'dist/img/',
          },
        },
      },

      {
        test: /\.scss$/,
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: [{ loader: 'css-loader' }, 'sass-loader'],
        // }),
        use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader"
					},
					{
						loader: "sass-loader"
					}
				]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        },
      },
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'public/fonts/[name].[ext]',
          outputPath: 'dist/fonts',
        },
      },
    ],
  },

  plugins: [
    // new ExtractTextPlugin({ filename: 'style.css' }),
    new MiniCssExtractPlugin({
			filename: "style.css",
			chunkFilename: "[id].css"
		}),
    new HtmlWebpackPlugin({
      template: './resources/index.html',
      filename: './index.html',
      hash: true,
    }),
  ],

  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    contentBase: './dist',
  },
};