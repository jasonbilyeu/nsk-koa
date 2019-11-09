## Table of Contents

Entity
- [Create](./create.md)
- [Update](./update.md)
- [Detail](./detail.md)
- [List](./list.md)
- [Delete](./delete.md)

## Entity Create

Create a new entity.

### Endpoint
```http
POST /{namespace}/entities
```

---

### Request
```http
POST /{namespace}/entities HTTP/1.1
Host: api.domain.com
Authorization: Bearer {token}
```
```json
{
  "data": {
    "type": "entity",
    "properties": {
      "name": "example name"
    }
  }
}
```

### Response
```http
HTTP/1.1 200 OK
```
```json
{
  "data": {
    "type": "entity",
    "id": "55d4cf2d-016f-43df-af3c-64d751cdb664",
    "properties": {
      "name": "example name",
      "created_on": "2019-11-01T04:10:40.780Z",
      "created_by": "cfd019ed-f5ae-45c8-90a8-46fa50a1edba",
      "modified_on": null,
      "modified_by": null,
    }
  }
}
```