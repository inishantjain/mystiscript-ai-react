import { NextFunction, Request, Response } from "express";

//no need of making it asynchronous
export const notFound = (req: Request, res: Response) => {
  res.status(404).send("Route Does Not Exist");
};
