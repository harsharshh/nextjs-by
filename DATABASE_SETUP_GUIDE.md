# Complete Database Setup Guide

## Environment Variables Setup

Your `.env.local` file is now configured with three database connection URLs:

```env
PRISMA_DATABASE_URL="postgres://..."    # Primary URL used by Prisma ORM
POSTGRES_URL="postgres://..."           # Alternative PostgreSQL URL
```

### Which Variable to Use?

- **PRISMA_DATABASE_URL**: Used by Prisma ORM (schema.prisma)
  - Required for all Prisma operations
  - Used in `lib/prisma.ts` configuration
  
- **POSTGRES_URL**: Alternative URL 
  - Can be used by other PostgreSQL clients
  - Useful for direct database access if needed

## Step-by-Step Setup

### 1. Verify Environment File
```bash
# Check if .env.local is properly configured
cat .env.local
```

**Expected output:**
```
PRISMA_DATABASE_URL="postgres://..."
POSTGRES_URL="postgres://..."
```

✅ Make sure `.env.local` is in `.gitignore` (it should be)

### 2. Install Dependencies
```bash
npm install
```

This installs:
- `@prisma/client` - Prisma database client
- `prisma` - Prisma CLI for running migrations and seeds
- All other project dependencies

### 3. Verify Database Connection
Prisma will automatically validate the connection string from `PRISMA_DATABASE_URL`:

```bash
npm run db:push
```

This command:
- Reads `PRISMA_DATABASE_URL` from `.env.local`
- Connects to your PostgreSQL database
- Creates the schema (users and roles tables)
- Displays any errors if connection fails

### 4. Seed Sample Data
```bash
npm run db:seed
```

This creates:
- 3 default roles: Admin, User, Moderator
- 5 sample users with assigned roles

### 5. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## How the Environment Variables are Used

### In Prisma Schema (`prisma/schema.prisma`)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("PRISMA_DATABASE_URL")  # ← Uses PRISMA_DATABASE_URL
}
```

### In Prisma Client (`lib/prisma.ts`)
```typescript
export const prisma = new PrismaClient({
  log: ['query'],
})
```

The client automatically reads from the datasource URL in schema.prisma

### In API Endpoints (`app/api/users/route.ts`)
```typescript
import { prisma } from '@/lib/prisma'

const users = await prisma.user.findMany(...)
```

All database queries go through the Prisma client

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run db:push` | Sync schema with database |
| `npm run db:seed` | Populate sample data |
| `npm run db:migrate` | Create and apply migrations |
| `npm run build` | Build for production |
| `npm start` | Start production server |

## Deployment to Vercel

### 1. Add Environment Variables to Vercel
In Vercel Dashboard → Settings → Environment Variables:

```
PRISMA_DATABASE_URL=postgres://...
POSTGRES_URL=postgres://...
```

### 2. Update Build Command
In Vercel Dashboard → Settings → Build & Development Settings:

**Build Command:**
```bash
npx prisma db push && npm run build
```

This ensures:
- Schema is synced before building
- All tables are created if they don't exist
- Seed data is available (optional)

### 3. Deploy
Push to GitHub and Vercel will automatically deploy with the environment variables

## Verification Checklist

- [ ] `.env.local` file exists
- [ ] `PRISMA_DATABASE_URL` is set correctly
- [ ] `.env.local` is in `.gitignore`
- [ ] `npm install` completed successfully
- [ ] `npm run db:push` succeeded
- [ ] `npm run db:seed` completed
- [ ] `npm run dev` starts without errors
- [ ] `http://localhost:3000` loads successfully
- [ ] User table displays data

## Troubleshooting

### Connection Error: "password authentication failed"
- Verify the credentials in `PRISMA_DATABASE_URL`
- Check the URL format: `postgres://user:password@host:port/database`

### Error: "certificate verify failed"
- Already handled with `?sslmode=require` in connection string
- This is the secure connection mode

### Tables Don't Exist
```bash
npm run db:push
```

### No Data Showing
```bash
npm run db:seed
```

### Port 5432 Already in Use
- Use a different port in the connection string
- Or kill the existing PostgreSQL process

## Security Notes

✅ `.env.local` is ignored by git  
✅ NEVER commit `.env.local` to repository  
✅ Use `.env.example` to share the template  
✅ Keep credentials private  
✅ Rotate credentials periodically  

## File References

- **Schema:** `prisma/schema.prisma`
- **Client:** `lib/prisma.ts`
- **Seed:** `prisma/seed.ts`
- **Config:** `package.json` (prisma configuration)
- **Environment:** `.env.local` (never committed)
- **Example:** `.env.example` (template only)
