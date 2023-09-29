import { Prisma } from "@prisma/client";
import { CustomAPIError } from "../errors";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  err: CustomAPIError | Prisma.PrismaClientKnownRequestError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: CustomAPIError = new CustomAPIError("");

  if (err instanceof CustomAPIError) customError = err;
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      customError.statusCode = 400;
      customError.message = `${err.meta!["target"]} already exists`;
    }
  } else {
    customError.message = "Internal error: " + err.message;
    console.error(err.message);
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
};
