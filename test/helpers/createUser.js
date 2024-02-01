const prisma = require("../../src/utils/prisma");
const bcrypt = require("bcrypt");

/**
 * @param {string} username
 * @param {string} password
 * @param {"USER" | "ADMIN"} role
 * @returns
 */
const createUser = async (username, password, role = "USER") => {
  const newUser = await prisma.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 6),
      roles: {
        create: {
          role: {
            connectOrCreate: {
              create: {
                type: role,
              },
              where: {
                type: role,
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
            include: {
              permissions: true
            }
          }
        }
      }
    }
  });
  return newUser
};

module.exports = {
  createUser,
};
