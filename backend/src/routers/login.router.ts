import { Router } from "express";
import { prisma } from "../lib/prisma";
import { compare } from "../lib/encryption";
import { createToken } from "../lib/jwt";

const router = Router();

const ONE_DAY = 24 * 3600;

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({ msg: "username or password does not correct" });
    }

    const token = createToken({ username: user.username, email: user.email, id: user.id })
    res.cookie("token", token, { maxAge: ONE_DAY, httpOnly: false })
    res.json({ token, user: { ...user, password: undefined } });
  } catch (err) {
    res.status(500).json(err);
  }
})

export default router;
