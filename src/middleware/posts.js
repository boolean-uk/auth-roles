const prisma = require("../utils/prisma");

async function verifyAdmin(req, res, next) {
  const user = await prisma.user.findUnique({
    where: { id: req.id },
    include: {
      posts: true,
    },
  });

  const post = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (post.userId === user.id) {
    return next();
  }

  if (user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ error: "Access denied - must be admin to access" });
  }

  next();
}

module.exports = { verifyAdmin };
