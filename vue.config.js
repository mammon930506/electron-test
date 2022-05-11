const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions:{
    electronBuilder:{
      nodeIntegration: true,
      externals: ['ref-napi', 'ffi-napi','ref-array-napi','ref-struct-napi'],
      builderOptions: {
        extraResources: {
          from: 'resources/',
          to: './'
        }
      }
    }
  },
  runtimeCompiler: true,
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.m?js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    })
    config.optimization.minimize = false
  }
})
