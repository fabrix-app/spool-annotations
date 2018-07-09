import { Annotation } from 'ecmas-annotations'
import { isObject, last } from 'lodash'
/**
 *
 * @type {*}
 */
export class Route extends Annotation {
  public query

  constructor(data, filePath) {
    super(data, filePath)
  }
  /**
   * The possible targets
   *
   * (Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
   *
   * @type {Array}
   */
  static get targets() {
    return [Annotation.METHOD]
  }


  /**
   * The function to call when annotations are find
   *
   * @type {Function}
   */
  handler(app, annotation) {
    let infos: {[key: string]: any} = {}

    if (!annotation.className) {
      annotation.className = last(annotation.filePath.split('/')).toString().replace('.js', '')
    }

    if (isObject(annotation.value)) {
      infos = annotation.value
      infos.handler = annotation.className + '.' + annotation.target
      if (this.query) {
        infos.method = this.query
      }
    }
    else {
      const parts = annotation.value.split(' ')
      infos = {
        method: this.query || parts[0],
        path: this.query ? parts[0] : parts[1],
        handler: annotation.className + '.' + annotation.target
      }
    }

    app.config.routes.push(infos)
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
