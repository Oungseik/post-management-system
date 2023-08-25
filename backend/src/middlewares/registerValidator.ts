import type { Request, Response, NextFunction } from "express";
import { parseUser } from "../lib/validator";

async function registerValidator(req: Request, res: Response, next: NextFunction) {
  try {
    const user = parseUser(req.body);
    req.body = user;
    next();
  } catch (err) {
    res.status(400).json(err);
  }
}

export {
  registerValidator,
}
