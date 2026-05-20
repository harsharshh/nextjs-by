# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Users

#### GET /api/users
Fetch all users with their roles.

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Admin",
    "created_at": "2024-05-20T10:00:00.000Z"
  }
]
```

**Status:** 200 OK or 500 Error

---

#### GET /api/users/[id]
Fetch a specific user by ID.

**Parameters:**
- `id` (path): User ID

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Admin",
  "created_at": "2024-05-20T10:00:00.000Z"
}
```

**Status:** 200 OK, 404 Not Found, or 500 Error

---

#### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "roleId": 2
}
```

**Response:**
```json
{
  "id": 6,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "User",
  "created_at": "2024-05-20T14:30:00.000Z"
}
```

**Status:** 201 Created, 400 Bad Request, or 500 Error

---

#### PUT /api/users/[id]
Update an existing user.

**Parameters:**
- `id` (path): User ID

**Request Body:**
```json
{
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "roleId": 3
}
```

**Response:**
```json
{
  "id": 6,
  "name": "Alice Smith",
  "email": "alice.smith@example.com",
  "role": "Moderator",
  "created_at": "2024-05-20T14:30:00.000Z"
}
```

**Status:** 200 OK, 400 Bad Request, or 500 Error

---

#### DELETE /api/users/[id]
Delete a user.

**Parameters:**
- `id` (path): User ID

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

**Status:** 200 OK, 404 Not Found, or 500 Error

---

### Roles

#### GET /api/roles
Fetch all available roles.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Admin"
  },
  {
    "id": 2,
    "name": "User"
  },
  {
    "id": 3,
    "name": "Moderator"
  }
]
```

**Status:** 200 OK or 500 Error

---

#### POST /api/roles
Create a new role.

**Request Body:**
```json
{
  "name": "Editor"
}
```

**Response:**
```json
{
  "id": 4,
  "name": "Editor"
}
```

**Status:** 201 Created, 400 Bad Request, or 500 Error

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error title",
  "message": "Detailed error message"
}
```

### Common Error Codes

- **400 Bad Request**: Missing or invalid required fields
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

---

## Example Usage

### Fetch Users
```bash
curl http://localhost:3000/api/users
```

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Wilson",
    "email": "bob@example.com",
    "roleId": 2
  }'
```

### Update User
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "roleId": 1
  }'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Get Roles
```bash
curl http://localhost:3000/api/roles
```

---

## Notes

- All timestamps are in ISO 8601 format with UTC timezone
- Emails must be unique across the system
- Role IDs must exist before assigning to users
- Deleting a user will cascade if the role is also deleted
