'use strict'
const Controller = require('@fabrix/fabrix/dist/common').FabrixController

/**
 * @module DefaultController
 *
 * @description Default Controller included with a new Fabrix app
 * @see {@link https://fabrix.app/doc/api/controllers}
 * @this FabrixApp
 */
module.exports = class DefaultController extends Controller{
  /**
   * @Route({method: ["GET", "DELETE"], path: "/default/info"})
   * @Policy("Default.auth")
   * @Policy(["Default.acl"])
   * @MyCustomAnnotation("It's works")
   * @param request
   * @param reply
   */
  info (request, reply) {
    reply('ok')
  }
}
