import * as ecmasAnnotations from 'ecmas-annotations'
import { sync } from 'glob'
import { sep } from 'path'
import { each } from 'lodash'

export const Configure = (app, annotations) => {
  // create the registry
  const registry = new ecmasAnnotations.Registry()

  each(annotations, (value, key) => {
    if (app.config.get(`annotations.${key}`) === undefined || app.config.get(`annotations.${key}`)) {
      registry.registerAnnotation(value.path)
    }
  })

  const controllersFolder = app.config.get('annotations.pathToScan')
  const pattern = controllersFolder + sep + '**' + sep + '*.js'

  const handleAnnotation = filePath => {
    return annotation => {
      // Remove controllers path
      filePath = filePath.replace(controllersFolder, '')

      if (annotation.handler) {
        annotation.handler(app, annotation)
      }
      else {
        app.log.info('No handler for annotation: ' + annotation.annotation)
      }
    }
  }

  const iterate = filePath => {
    // create the annotation reader
    const reader = new ecmasAnnotations.Reader(registry, app.config.get('annotations.globalContext'))

    // parse the annotations from a file
    reader.parse(filePath, ecmasAnnotations.Reader.ES6)

    // get the annotations
    const definitionAnnotations = reader.definitionAnnotations
    const constructorAnnotations = reader.constructorAnnotations
    const methodAnnotations = reader.methodAnnotations
    const propertyAnnotations = reader.propertyAnnotations

    // loop through and handle the annotations
    definitionAnnotations.forEach(handleAnnotation(filePath))
    constructorAnnotations.forEach(handleAnnotation(filePath))
    methodAnnotations.forEach(handleAnnotation(filePath))
    propertyAnnotations.forEach(handleAnnotation(filePath))
  }
  const files = sync(pattern, {cwd: process.cwd()}) || []
  files.forEach(iterate)
}
