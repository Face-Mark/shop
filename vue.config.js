module.exports = {
  devServer: {
    open: true,
    port: 9000
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'elment-ui': 'ELEMENT',
      'moment': 'moment',
      'axios': 'axios'
    }
  }
}
