# spool-annotations

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Follow @FabrixApp on Twitter][twitter-image]][twitter-url]

:package: Add Route, Policy and custom annotations support for Fabrix applications

## Intallation
With fab cli :

```
npm install -g @fabrix/fab-cli
fab spool spool-annotations
```

With npm (you will have to create config file manually) :

`npm install --save @fabrix/spool-annotations`

## Configuration
First you need to add this spool to your __main__ configuration : 
```js
// config/main.ts

export const annotations = {
   // ...

   spools: [
      // ...
      require('@fabrix/spool-annotations').AnnotationsSpool,
      // ...
   ]
   // ...
}
```

Then :
```js
// config/annotations.ts
export const annotations = {
  policy: true,//enable policy annotations
  route: true,//enable route annotations
  pathToScan: './api/controllers',//or ./api for hmvc
  customAnnotations: null, //Add your custom annotations here, require('./annotations') for example

}
```

## Usage

### Route
A route added with annotation will replace any previous route set under `config/routes.ts` (for a same path).
```
module.exports = class DefaultController extends Controller {

  /**
   * Return some info about this application
   * @Route("GET /default/info") or @Route({method: ["GET"], path: "/default/info"})
   */
  info (request, reply) {
    reply.json(this.app.services.DefaultService.getApplicationInfo())
  }
}
```

You can also use @METHOD for defining new routes.
```
module.exports = class DefaultController extends Controller {

  /**
   * Return some info about this application
   * @GET('/default/info')
   * @HEAD('/default/info')
   * @OPTIONS('/default/info')
   * @POST('/default/info')
   * @PUT('/default/info')
   * @PATCH('/default/info')
   * @DELETE('/default/info')
   */
  info (request, reply) {
    reply.json(this.app.services.DefaultService.getApplicationInfo())
  }
}
```

A more complex sample with validation.
```
module.exports = class DefaultController extends Controller {

  /**
   * Return some info about this application
   * @GET(path:{'/default/info'}, config: { validate: {
   * query: { infos: Joi.sring().required() }
   * }})
   */
  info (request, reply) {
    reply.json(this.app.services.DefaultService.getApplicationInfo())
  }
}
```

See [hapijs tutorial on validation](http://hapijs.com/tutorials/validation) and [joi schema validation](https://github.com/hapijs/joi) for more complex with validate object.

### Policy
A policy added with annotation will be added to policies set under `config/policies.ts`.
```
module.exports = class DefaultController extends Controller {

  /**
   * Return some info about this application
   * @Policy("Default.auth") or @Policy(["Default.auth", "Default.acl"])
   */
  info (request, reply) {
    reply.json(this.app.services.Defaultervice.getApplicationInfo())
  }
}
```

### Custom
Create your own annotation like this :

```
'use strict'
const Annotation = require('ecmas-annotations').Annotation

export class MyCustomAnnotation extends Annotation {

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
      //Do whatever you want when annotation is found
    }

    /**
     * File path
     *
     * @type {String}
     * @required
     */
    static get path() {
      return __filename
    }

}

```
Now I can add `@MyCustomAnnotation("It works")` on methods.

## License
[MIT](https://github.com/jaumard/spool-annotations/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/@fabrix/spool-annotations.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fabrix/spool-annotations
[ci-image]: https://img.shields.io/circleci/project/github/fabrix-app/spool-annotations/master.svg
[ci-url]: https://circleci.com/gh/fabrix-app/spool-annotations/tree/master
[daviddm-image]: http://img.shields.io/david/fabrix-app/spool-annotations.svg?style=flat-square
[daviddm-url]: https://david-dm.org/fabrix-app/spool-annotations
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/fabrix-app/fabrix
[twitter-image]: https://img.shields.io/twitter/follow/FabrixApp.svg?style=social
[twitter-url]: https://twitter.com/FabrixApp
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/fabrix-app/spool-annotations.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/fabrix-app/spool-annotations/coverage

