const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: false,
  pluginOptions:{
    electronBuilder:{
      nodeIntegration: true,
      externals: ['ref-napi', 'ffi-napi','ref-array-napi','ref-struct-napi'],
      builderOptions: {
        // extraFiles:[
        //   {
        //     from: 'public/pdfjs',
        //     to: './'
        //   }
        // ],
        extraResources: [{
          from: 'resources/',
          to: './'
        }]
      }
    },
  },
  runtimeCompiler: true,
  configureWebpack: (config) => {
    // config.module.rules.push({
    //   test: /\.m?js$/,
    //   loader: 'babel-loader',
    //   exclude: /node_modules/
    // })
    config.optimization.minimize = false
    config.devtool= 'source-map'
  },
  chainWebpack (config) {
    config.plugin('copy').use(require('copy-webpack-plugin'), [{
      patterns:[{
        from: __dirname+'/resources/pdfjs',
        to: './resources/pdfjs'
      }]
    }])
  //   config.optimization.minimizer('terser').tap((args) => {
  //     args[0].terserOptions.compress.drop_debugger = false
  //     args[0].terserOptions.compress.drop_console = false
  //     return args
  //   })
  }
})
