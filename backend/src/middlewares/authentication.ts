import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { parseToken } from "../lib/jwt";

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
    }
  }
}

async function authenticator(req: Request, res: Response, next: NextFunction) {
  const token = req.headers?.authorization?.split(" ").at(1);
  if (!token) return res.status(401).json({ msg: "Not signed in yet!" });
  try {
    req.jwtPayload = parseToken(token) as JwtPayload;
    next();
  } catch (err) {
    res.status(403).json(err);
  }
}

export { authenticator };
