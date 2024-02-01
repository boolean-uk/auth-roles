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

const deletePostDb = async (id) => {
  return await prisma.post.delete({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
};

module.exports = {
  createPostDb,
  deletePostDb,
};
