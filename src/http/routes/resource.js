/**
 * @file http/routes/resource.js
 * @overview example resource router
 */

const config = require('config')
const Router = require('@koa/router')

module.exports = function createRouter({ controller, core, middleware }) {
  const { create, destroy, detail, update } = controller

  const { namespace } = config.get('api')
  const router = new Router({ prefix: `/${namespace}/resources` })
  router.use(middleware.localType({ type: core.Resource.DomainResource }))

  router.get('/:id', detail)
  router.post('/', create)
  router.patch('/:id', update)
  router.delete('/:id', destroy)

  return router
}

module.exports.inject = {
  require: {
    controller: 'http/controllers/domain',
    core: 'core',
    middleware: {
      localType: 'http/middleware/local-type',
    },
  },
}
