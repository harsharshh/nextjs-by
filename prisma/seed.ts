import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // Clear existing data
  await prisma.user.deleteMany({})
  await prisma.role.deleteMany({})

  // Create roles
  const admin = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  })

  const user = await prisma.role.create({
    data: {
      name: 'User',
    },
  })

  const moderator = await prisma.role.create({
    data: {
      name: 'Moderator',
    },
  })

  console.log(`Created roles: ${admin.name}, ${user.name}, ${moderator.name}`)

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      roleId: admin.id,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      roleId: user.id,
    },
  })

  const user3 = await prisma.user.create({
    data: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      roleId: moderator.id,
    },
  })

  const user4 = await prisma.user.create({
    data: {
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      roleId: user.id,
    },
  })

  const user5 = await prisma.user.create({
    data: {
      name: 'Tom Brown',
      email: 'tom@example.com',
      roleId: user.id,
    },
  })

  console.log(`Created 5 users`)
  console.log(`Seed completed.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
