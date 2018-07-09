import * as Joi from  'joi'
import * as customAnnotations from '../annotations'
export const annotations = {
  policy: true,
  route: true,
  globalContext: {
    Joi: Joi
  },
  pathToScan: './api/controllers',
  customAnnotations: customAnnotations
}
