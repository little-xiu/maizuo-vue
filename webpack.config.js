module.exports = {
  entry: './src/main.js',
  output: {
      path: __dirname,
      filename: 'dist/app.js'
  },
  module: {
      rules: [
          {
            loader: 'babel-loader',
            test:/\.js$/,
            exclude: /node_modules/
          },
          {   
            loader: 'style-loader!css-loader',
            test: /\.css$/
          },
        	{
            loader: 'file-loader',
            test: /\.(png|ttf|jpg|jpeg|gif)$/
          },
          {
          	loader: "vue-loader",
          	test: /\.vue$/
          }
      ]
  }
}