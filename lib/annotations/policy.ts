import { Annotation } from 'ecmas-annotations'
import { isArray, last } from 'lodash'

/**
 *
 * @type {*}
 */
export class Policy extends Annotation {

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

    if (!annotation.className) {
      annotation.className = last(annotation.filePath.split('/')).toString().replace('.js', '')
    }
    const policies = app.config.policies
    if (!policies[annotation.className]) {
      policies[annotation.className] = {}
    }

    if (!policies[annotation.className][annotation.target]) {
      policies[annotation.className][annotation.target] = []
    }

    if (isArray(annotation.value)) {
      policies[annotation.className][annotation.target] = policies[annotation.className][annotation.target].concat(annotation.value)
    }
    else {
      policies[annotation.className][annotation.target].push(annotation.value)
    }
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
