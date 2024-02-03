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

const deletePostByIdDb = async (id) =>
  await prisma.post.delete({
    where: { id },
  });

const findPostByIdDb = async (id) =>
  await prisma.post.findUnique({
    where: { id },
  });

module.exports = {
  createPostDb,
  findPostByIdDb,
  deletePostByIdDb,
};
