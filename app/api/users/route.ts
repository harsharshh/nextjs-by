import { NextRequest, NextResponse } from 'next/server'
import getDatabase from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const db = getDatabase()

    // Fetch users with their role information
    const users = db.prepare(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        r.name as role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      ORDER BY u.created_at DESC
    `).all()

    return NextResponse.json(users, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch users',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
