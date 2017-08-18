const { expect } = require('chai')
const config = require('config')
const faker = require('faker')
const { createServer } = require('http')
const { afterEach, before, describe, it } = require('mocha')
const sinon = require('sinon')
const { agent } = require('supertest')

const { loadModules } = require('../../../utils')

function generateRequest() {
  const entityId = faker.random.uuid()
  const body = {
    jsonapi: { version: '1.0' },
    data: {
      id: entityId,
      type: 'feature',
      attributes: {
        feature: {
          key1: faker.lorem.words(),
          key2: faker.lorem.words(),
        },
      },
    },
  }
  return { body, entityId }
}

describe('[integration] POST /feature', function () {
  this.timeout(30000)

  before('load modules', function () {
    this.sandbox = sinon.sandbox.create()
    return loadModules.call(this, {
      app: 'http/app',
    })
      .then(() => {
        this.request = agent(createServer(this.app.callback()))
      })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  describe('failure states', function () {
    it('fails (400) with an invalid payload', function () {
      return this.request
        .post('/feature')
        .send({ foo: 'bar' })
        .expect(400)
        .then((res) => {
          expect(res.body).to.have.property('errors')
            .that.is.an('array')
            .with.lengthOf(1)
          const err = res.body.errors[0]
          expect(err).to.have.property('title', 'Bad Request')
          expect(err).to.have.property('status', '400')
        })
    })
  })

  describe('success states', function () {
    const { body, entityId } = generateRequest()

    it('succeeds (201) with valid feature payload', function () {
      return this.request
        .post('/feature')
        .send(body)
        .expect(201)
        .then((res) => {
          const doc = res.body
          expect(doc).to.be.an('object')
            .with.all.keys(['jsonapi', 'data'])
          const { data } = doc
          expect(data).to.be.an('object')
            .with.all.keys(['type', 'id', 'attributes', 'links'])
          const { type, id, attributes, links } = data
          expect(type).to.equal(body.data.type)
          expect(id).to.equal(entityId)
          expect(attributes).to.deep.equal(body.data.attributes)
          expect(links).to.be.an('object')
            .with.all.keys(['self'])
          const { self } = links
          expect(self).to.equal(`${config.get('api.baseUrl')}/feature/${entityId}`)
        })
    })
  })
})
