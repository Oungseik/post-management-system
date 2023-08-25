import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

function createToken(payload: Record<string, any>) {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1d" });
}

function parseToken(token: string) {
  return jwt.verify(token, JWT_SECRET as string);
}

export { createToken, parseToken };
