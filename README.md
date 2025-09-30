## Prerequisites

- Node.js
- Postgresql

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Setting up .env file

```
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password123
DB_NAME=library_db

CORS_ORIGIN=http://localhost:3000

JWT_SECRET=this-is-very-secret
JWT_EXPIRATION=1d
```

### 3. Set up the database

```bash
npm run migration:run
```

### 7. Start the application

```bash
npm run start:dev
```

### 8. API Collection

![API Collection](postman_collection.json)