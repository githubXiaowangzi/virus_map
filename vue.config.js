module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/geo': {
        target: 'https://api.mapbox.com/styles/v1/924152651/ck6m17bz00qg81iqajselyt9h/wmts?access_token=pk.eyJ1IjoiOTI0MTUyNjUxIiwiYSI6ImNrNjkwdXYwNjBhMzUzZHBtZHZqMHc1Y3QifQ.-ghyt3JdDn12Wk31yifDLw',
        changOrigin: true,
        pathRewrite: {
          '^/geo': ''
        }
      }
    }
  }
}
