module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/NoMash-Library/'
    : '/',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
} 