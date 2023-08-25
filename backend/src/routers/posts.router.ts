import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authenticator } from "../middlewares/authentication";

const router = Router();

router.get("/", async (req, res) => {
  const { count, page, user } = req.query;

  if (!(count && page)) {
    const posts = await prisma.post.findMany({ take: Number(count) || 10, include: { user: Boolean(user) }, orderBy: [{ id: "desc" }] });
    posts.forEach(post => post.user?.password && (post.user.password = ""));
    return res.json({ posts });
  }

  let skip = Number(page) > 0 ? (Number(page) - 1) * Number(count) : 0;
  const posts = await prisma.post.findMany({
    skip,
    take: Number(count),
    include: { user: Boolean(user) },
    orderBy: [{ id: "desc" }]
  });
  posts.forEach(post => post.user?.password && (post.user.password = ""));
  res.json({ posts });
})

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({ where: { id }, include: { user: true } });
  if (!post) {
    return res.status(404).json({ msg: "not found" });
  }
  post.user?.password && (post.user.password = "");
  res.json(post);
})

// login first to perform CUD operation
router.use(authenticator);

router.post("/", async (req, res) => {
  const { id: userId } = req.jwtPayload;
  const { title, content, image } = req.body;

  if (!(title && content)) {
    return res.status(400).json({ msg: "post must have the title and content" });
  }

  try {
    const post = await prisma.post.create({ data: { title, content, image, userId }, include: { user: true } });
    post.user?.password && (post.user.password = "");
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { id: userId } = req.jwtPayload;
  const { title, content } = req.body;

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) {
    return res.status(404).json({ msg: "not found" });
  }

  if (userId !== post.userId) {
    return res.status(403).json({ msg: "unable to edit other user's post" });
  }

  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title, content
    },
    include: { user: true }
  })

  updatedPost.user?.password && (updatedPost.user.password = "");
  res.json({ post: updatedPost });
})

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { id: userId } = req.jwtPayload;

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) {
    return res.status(204).end();
  }

  if (userId !== post.userId) {
    return res.status(403).json({ msg: "unable to delete other user's post" });
  }

  await prisma.post.delete({ where: { id } });
  res.status(204).end();
})

export default router;
