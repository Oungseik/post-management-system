import { hash } from "../lib/encryption";
import { prisma } from "../lib/prisma";
import { registerValidator } from "../middlewares/registerValidator";

import { Router } from "express";
const router = Router();

router.post("/", registerValidator, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const users = await prisma.user.findMany({ where: { OR: [{ username }, { email }] } })

    if (users.length) {
      return res.status(400).json({ msg: "Username or Email is already in used." });
    }

    const user = await prisma.user.create({ data: { username, email, password: await hash(password) } })
    res.status(201).json({ ...user, password: undefined })
  } catch (err) {
    res.status(500).json(err)
  }
});

export default router;
