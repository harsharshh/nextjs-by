# Prisma Database Setup Guide

This file documents how to set up and use the Prisma database connection.

## Environment Variables

Your `.env.local` file contains:
- `PRISMA_DATABASE_URL`: PostgreSQL connection string from Vercel/Prisma (used by Prisma ORM)
- `POSTGRES_URL`: Alternative PostgreSQL connection string (for other tools/services)

**IMPORTANT**: `.env.local` is in `.gitignore` and should never be committed to git.

## Initial Setup Commands

After cloning, run these commands in order:

### 1. Install Dependencies
```bash
npm install
```

### 2. Push Schema to Database
This creates the tables in your PostgreSQL database:
```bash
npm run db:push
```

### 3. Seed Database with Sample Data
This populates the database with 5 sample users and 3 roles:
```bash
npm run db:seed
```

## Available Database Commands

- `npm run db:push` - Syncs your Prisma schema with the PostgreSQL database
- `npm run db:seed` - Runs the seed script to populate sample data
- `npm run db:migrate` - Create and apply migrations (for development)

## Database Schema

### Roles Table
- `id` - Primary key
- `name` - Role name (Admin, User, Moderator)
- `createdAt` - Creation timestamp

### Users Table
- `id` - Primary key
- `name` - User's name
- `email` - User's email (unique)
- `roleId` - Foreign key to Roles table
- `createdAt` - Creation timestamp

## API Endpoint

**GET** `/api/users`

Returns JSON array of all users with their roles:
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

## Prisma Client Usage

The Prisma client is initialized in `lib/prisma.ts` with a singleton pattern to avoid multiple instances in development.

### Example Usage in API Routes:
```typescript
import { prisma } from '@/lib/prisma'

// Get all users with roles
const users = await prisma.user.findMany({
  include: { role: true }
})

// Get a specific user
const user = await prisma.user.findUnique({
  where: { email: 'john@example.com' },
  include: { role: true }
})

// Create a new user
const newUser = await prisma.user.create({
  data: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    roleId: 2
  },
  include: { role: true }
})
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your Vercel project
3. Add `DATABASE_URL` to Vercel environment variables
4. Vercel will automatically install dependencies
5. Add a build command to run migrations:
   - In Vercel dashboard, add "Build Command": `prisma db push && next build`

## Troubleshooting

### Connection Issues
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running on Vercel
- Ensure your IP is whitelisted in PostgreSQL settings

### Schema Out of Sync
```bash
npm run db:push
```

### Reset Database (WARNING: Deletes all data)
```bash
# Delete all data and recreate schema
npm run db:push -- --force-reset
```

## Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for database credentials
- Keep DATABASE_URL private
- Use `.env.example` as a template for other developers
