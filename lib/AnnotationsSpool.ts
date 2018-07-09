const _ = require('lodash')
import { Spool } from '@fabrix/fabrix/dist/common'
import { Configure } from './configure'
import * as config from './config/index'
import * as pkg from '../package.json'

export class AnnotationsSpool extends Spool {

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: {}
    })
  }
  /**
   * Search for annotations and configure routes/policies found
   */
  configure() {
    if (!this.app.config.get('annotations.customAnnotations')) {
      this.app.config.set('annotations.customAnnotations', {})
    }
    Configure(this.app, this.app.config.get('annotations.customAnnotations'))
  }
}

