import { CustomAPIError } from "../errors";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  err: CustomAPIError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: CustomAPIError;
  if (err instanceof CustomAPIError) customError = err;
  else {
    customError = new CustomAPIError("Some error occurred");
    console.error(err.message);
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
};
