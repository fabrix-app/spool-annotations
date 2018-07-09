import { Route } from './route'

/**
 *
 * @type {*}
 */
export class OPTIONS extends Route {

  constructor(data, filePath) {
    super(data, filePath)
    this.query = 'OPTIONS'
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
