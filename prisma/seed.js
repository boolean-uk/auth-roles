const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

async function seed() {
  const userRole = await createRole("USER");
  await createPermissions(userRole);

  const users = [];

  while (users.length < 10) {
    const user = await createUser(
      faker.internet.userName(),
      "123456789",
      userRole
    );
    users.push(user);
  }

  process.exit(0);
}

async function createUser(username, password, role) {
  const posts = [];

  for (let i = 0; i < username.length; i++) {
    posts.push({ title: faker.lorem.sentence() });
  }

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 6),
      posts: {
        create: posts,
      },
      roles: {
        create: {
          roleId: role.id,
        },
      },
    },
    include: {
      posts: true,
      roles: {
        select: {
          role: {
            select: {
              type: true,
            },
          },
        },
      },
    },
  });

  console.log("User created", user);
  console.log(user.roles);

  return user;
}

async function createPermissions(role) {
  /**
   * @type {("CREATE" | "READ" | "UPDATE" | "DELETE")[]}
   */
  const operations = ["CREATE", "READ", "UPDATE", "DELETE"];

  operations.forEach((operation) => {
    prisma.permission.create({
      data: {
        operation,
        target: "OWN",
        resource: "POST",
        roles: {
          create: {
            roleId: role.id,
          },
        },
      },
    });
  });
}

async function createRole(type) {
  return await prisma.role.create({
    data: {
      type: type,
    },
  });
}

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
