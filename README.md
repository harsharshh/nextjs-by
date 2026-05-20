# Next.js User Management System

A modern Next.js 16 application with Tailwind CSS 4.2 that displays users and their roles from a SQLite database with complete error handling.

## Features

✅ **Next.js 16** with TypeScript  
✅ **Tailwind CSS 4.2** for beautiful styling  
✅ **SQLite Database** with users and roles tables  
✅ **API Endpoint** at `/api/users` for fetching user data  
✅ **Error Handling** with fallback logic  
✅ **Alert System** with success and error notifications  
✅ **Responsive Table** displaying users and their roles  
✅ **Retry Functionality** when API fails  

## Project Structure

```
├── app/
│   ├── api/
│   │   └── users/
│   │       └── route.ts          # API endpoint for fetching users
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page with user table
│   └── globals.css                # Global styles
├── lib/
│   └── db.ts                      # Database initialization and schema
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
└── .eslintrc.json
```

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

## Features Explained

### Database Schema

**Roles Table**
- id (PK)
- name
- created_at

**Users Table**
- id (PK)
- name
- email
- role_id (FK)
- created_at

### API Endpoint

**GET /api/users**

Returns a JSON array of users with their role information:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Admin",
    "created_at": "2024-05-20T10:00:00"
  }
]
```

### Error Handling

The application includes comprehensive error handling:

- **Network Failures**: Automatically retries and shows retry button
- **Invalid Data**: Validates JSON array format from API
- **API Errors**: Displays error messages with fallback to empty state
- **Loading States**: Shows spinner while fetching data

### Alert System

- **Success Alerts**: Shows when data loads successfully
- **Error Alerts**: Shows error messages with auto-dismiss after 5 seconds
- **Manual Dismiss**: Alert can be closed by clicking the X button

## Usage

1. The home page automatically fetches user data on load
2. Data is displayed in a styled table with columns for ID, Name, Email, Role, and Created Date
3. Roles are color-coded (Admin: Red, Moderator: Yellow, User: Blue)
4. If the API fails, an error message is shown with a retry button
5. The alert notification appears at the top and auto-dismisses

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

If you encounter issues:

1. **Clear Next.js cache:**
```bash
rm -rf .next
```

2. **Reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Check database:**
The SQLite database is created automatically in the `data/` directory on first run.

## Technologies Used

- **Next.js 16**: React framework with file-based routing
- **TypeScript**: Type-safe development
- **Tailwind CSS 4.2**: Utility-first CSS framework
- **Better-sqlite3**: Lightweight SQLite database
- **React Hooks**: Client-side state management

## License

MIT
