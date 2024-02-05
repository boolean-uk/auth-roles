const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

async function seed() {
  // Create an admin user first
  await createUser('admin', 'adminPassword', 'ADMIN');

  // Then create other users
  for (let i = 0; i < 10; i++) {
    await createUser(faker.internet.userName(), '123456789', 'USER');
  }

  console.log('Seeding completed.');
  process.exit(0);
}

async function createUser(username, password, role) {
  const hashedPassword = await bcrypt.hash(password, 6);

  const newUser = {
    username,
    passwordHash: hashedPassword,
    role: role,
    posts: {
      create: Array.from({ length: 5 }, () => ({
        title: faker.lorem.sentence(),
      })),
    },
  };

  const user = await prisma.user.create({ data: newUser });

  console.log('User created', user);
  return user;
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
