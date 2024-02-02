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

const getAuthorByPostId = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
  return post.user;
};

module.exports = {
  createPostDb,
  findPostDB,
  deletePostDB,
  getAuthorByPostId,
};
