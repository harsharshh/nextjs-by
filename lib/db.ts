import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'app.db')

// Create or get database connection
let db: Database.Database | null = null

function getDatabase() {
  if (!db) {
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    initializeSchema()
  }
  return db
}

function initializeSchema() {
  const database = db!

  // Create roles table
  database.exec(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Create users table
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    )
  `)

  // Check if roles already exist
  const roleCount = database.prepare('SELECT COUNT(*) as count FROM roles').get() as any
  
  if (roleCount.count === 0) {
    // Insert default roles
    const insertRole = database.prepare('INSERT INTO roles (name) VALUES (?)')
    insertRole.run('Admin')
    insertRole.run('User')
    insertRole.run('Moderator')
  }

  // Check if users already exist
  const userCount = database.prepare('SELECT COUNT(*) as count FROM users').get() as any
  
  if (userCount.count === 0) {
    // Insert sample users
    const insertUser = database.prepare(
      'INSERT INTO users (name, email, role_id) VALUES (?, ?, ?)'
    )
    
    const adminRole = database.prepare('SELECT id FROM roles WHERE name = ?').get('Admin') as any
    const userRole = database.prepare('SELECT id FROM roles WHERE name = ?').get('User') as any
    const moderatorRole = database.prepare('SELECT id FROM roles WHERE name = ?').get('Moderator') as any

    insertUser.run('John Doe', 'john@example.com', adminRole.id)
    insertUser.run('Jane Smith', 'jane@example.com', userRole.id)
    insertUser.run('Mike Johnson', 'mike@example.com', moderatorRole.id)
    insertUser.run('Sarah Williams', 'sarah@example.com', userRole.id)
    insertUser.run('Tom Brown', 'tom@example.com', userRole.id)
  }
}

export default getDatabase
