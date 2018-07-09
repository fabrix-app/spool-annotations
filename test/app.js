const _ = require('lodash')
const smokesignals = require('smokesignals')

const App = {
  pkg: {
    name: 'annotations-spool-test',
    version: '1.0.0'
  },
  api: require('./api'),
  config: {
    annotations: {
      policy: true,
      route: true,
      pathToScan: './test/api/controllers',
      customAnnotations: require('./annotations')
    },
    routes: [],
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('../dist').AnnotationsSpool // spool-annotations
      ]
    }
  }
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
