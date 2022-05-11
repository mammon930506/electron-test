module.exports = {
  presets: [
    ['@babel/preset-env',{
      useBuiltIns: 'usage',
      targets: {
        // eslint-disable-next-line global-require
        electron: require('electron/package.json').version,
      },
      corejs: '3'
    }]
  ],
  // plugins: [
  //   ['@babel/plugin-transform-runtime', {
  //     absoluteRuntime: false,
  //     corejs: 3,
  //     helpers: true,
  //     regenerator: true,
  //     useESModules: true,
  //   }]
  // ]
}
