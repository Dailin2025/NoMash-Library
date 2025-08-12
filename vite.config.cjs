const path = require('path')
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueDevTools = require('vite-plugin-vue-devtools')

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // GitHub Pages部署配置
  base: process.env.NODE_ENV === 'production' 
    ? '/NoMash-Library/'  // 新仓库名
    : '/'
}) 