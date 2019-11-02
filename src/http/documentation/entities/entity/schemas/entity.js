/**
 * @file http/documentation/entity/schemas/entity.js
 * @overview api documentation schemas
 */

const { merge } = require('lodash')

module.exports = function entity() {
  const DataEntities = {
    type: 'object',
    properties: {
      entities: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/EntityWithId',
        },
      },
    },
  }

  const DataSingleEntity = {
    type: 'object',
    properties: {
      data: {
        $ref: '#/components/schemas/Entity',
      },
    },
  }

  const DataSingleEntityWithId = {
    type: 'object',
    properties: {
      data: {
        $ref: '#/components/schemas/EntityWithId',
      },
    },
  }

  const Entity = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        description: 'Entity type',
        example: 'domain_entity',
      },
      properties: {
        type: 'object',
        properties: {
          name: {
            $ref: '#/components/schemas/name',
          },
        },
      },
    },
  }

  const EntityWithId = merge(Entity, {
    properties: {
      id: {
        $ref: '#/components/schemas/id',
      },
    },
  })

  const ErrorBase = {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'HTTP status code',
        example: '400',
      },
      title: {
        type: 'string',
        description: 'Error title',
        example: 'ValidationError',
      },
      detail: {
        type: 'string',
        description: 'Error message',
        example: 'Bad Request',
      },
    },
  }

  const ErrorWithSource = merge(ErrorBase, {
    properties: {
      source: {
        type: 'object',
        properties: {
          pointer: {
            type: 'string',
            description: 'JSON pointer to associated entity in the request document',
            example: '/data/properties/name',
          },
        },
      },
    },
  })

  const Errors = {
    type: 'array',
    items: {
      $ref: '#/components/schemas/ErrorWithSource',
    },
  }

  return {
    DataEntities,
    DataSingleEntity,
    DataSingleEntityWithId,
    Entity,
    EntityWithId,
    ErrorBase,
    ErrorWithSource,
    Errors,
  }
}

module.exports.inject = {}
