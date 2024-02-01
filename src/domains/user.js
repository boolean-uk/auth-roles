const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");

const createUserDb = async (username, password) => {
  return await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 6),
      roles: {
        create: {
          role: {
            connectOrCreate: {
              create: {
                type: "USER",
              },
              where: {
                type: "USER",
              },
            },
          },
        },
      },
    },
    include: {
      roles: {
        include: {
          role: {
            select: {
              type: true,
            },
          },
        },
      },
    },
  });
};

const deleteUserDb = async (id) => {
  const deletions = [
    prisma.userToRole.deleteMany({
      where: {
        userId: id,
      },
    }),
    prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
      },
    }),
  ];

  return prisma.$transaction(deletions);
};

const selectAllUsersDb = async () => {
  return await prisma.user.findMany({
    include: {
      roles: {
        include: {
          role: {
            select: {
              type: true,
            },
          },
        },
      },
    },
  });
};

const selectAdminByIdDb = async (id) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id,
      AND: {
        roles: {
          some: {
            role: {
              type: "ADMIN",
            },
          },
        },
      },
    },
  });
};

const selectUserPermission = async (userId, operation, resource, target) => {
  return await prisma.permission.findFirstOrThrow({
    where: {
      operation,
      resource,
      target,
      roles: {
        some: {
          role: {
            users: {
              some: {
                userId,
              },
            },
          },
        },
      },
    },
  });
};

const selectUserByPostId = async (postId) => {
  return await prisma.user.findFirstOrThrow({
    where: {
      posts: {
        some: {
          id: postId,
        },
      },
    },
  });
};

module.exports = {
  createUserDb,
  deleteUserDb,
  selectAdminByIdDb,
  selectAllUsersDb,
  selectUserByPostId,
  selectUserPermission,
};
