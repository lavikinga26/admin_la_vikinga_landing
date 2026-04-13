module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
      '/sanctum': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
      '/storage': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
    }
  }
}