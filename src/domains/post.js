const prisma = require("../utils/prisma");

const createPostDb = async (title, userId) =>
  await prisma.post.create({
    data: {
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

const findPostDB = async (id) => {
  return await prisma.post.findUnique({ where: { id: Number(id) } });
};

const deletePostDB = async (id) => {
  return await prisma.post.delete({ where: { id: Number(id) } });
};

module.exports = {
  createPostDb,
  findPostDB,
  deletePostDB,
};
