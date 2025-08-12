export default {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/NoMash-Library/'
    : '/',
  configureWebpack: {
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.esm-bundler.js',
        'vue-router': 'vue-router/dist/vue-router.esm-bundler.js'
      }
    },
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
  },
  css: {
    loaderOptions: {
      css: {
        modules: false
      }
    }
  }
} 