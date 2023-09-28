import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import BadRequestError from "../errors/bad-request";

export const hashPasswordMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) throw new BadRequestError("Provide a password");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  next();
};
