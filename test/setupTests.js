const prisma = require("../src/utils/prisma");

const deleteTablesEach = () => {
  const deleteTables = [
    prisma.userToRole.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany(),
  ];

  return prisma.$transaction(deleteTables);
};

const deleteTablesAll = () => {
  const deleteTables = [
    prisma.userToRole.deleteMany(),
    prisma.roleToPermission.deleteMany(),
    prisma.permission.deleteMany(),
    prisma.role.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany(),
  ];

  return prisma.$transaction(deleteTables);
};

const generatePermissions = (type, target, resource) => {
  /**
   * @type {("CREATE" | "READ" | "UPDATE" | "DELETE")[]}
   */
  const operations = ["CREATE", "READ", "UPDATE", "DELETE"];

  const transactions = operations.map((operation) => {
    return prisma.permission.create({
      data: {
        operation,
        target,
        resource,
        roles: {
          create: {
            role: {
              connectOrCreate: {
                create: {
                  type,
                },
                where: {
                  type,
                },
              },
            },
          },
        },
      },
    });
  });

  return prisma.$transaction(transactions);
};

global.beforeAll(() => {
  return deleteTablesAll();
});

global.beforeAll(() => {
  return generatePermissions("ADMIN", "ANY", "USER");
});

global.beforeAll(() => {
  return generatePermissions("USER", "OWN", "USER");
});

global.afterEach(() => {
  return deleteTablesEach();
});

global.afterAll(() => {
  return deleteTablesAll();
});

global.afterAll(() => {
  return prisma.$disconnect();
});
