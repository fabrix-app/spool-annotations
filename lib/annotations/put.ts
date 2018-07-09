import { Route } from './route'

/**
 *
 * @type {*}
 */
export class PUT extends Route {

  constructor(data, filePath) {
    super(data, filePath)
    this.query = 'PUT'
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
