import { Route } from './route'

/**
 *
 * @type {*}
 */
export class POST extends Route {


  constructor(data, filePath) {
    super(data, filePath)
    this.query = 'POST'
  }

  /**
   * File path
   *
   * @type {String}
   */
  static get path() {
    return __filename
  }

}
