import { NextFunction, Request, Response } from "express";
import { UnAuthenticatedError } from "../errors";
import { verifyJWT } from "../utils/auth";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader || authHeader?.startsWith("Bearer ")) token = authHeader.split(/ /)[1];
  else if (req.cookies.accessToken) token = req.cookies.accessToken;

  if (!token) throw new UnAuthenticatedError("Token is missing");
  try {
    const payload = verifyJWT(token);
    req.user = { id: payload.userId };
  } catch (error) {
    console.error(error);
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  next();
};
