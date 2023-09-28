import { Request, Response } from "express";
import { prisma } from "../config/database";
import { BadRequestError, CustomAPIError, NotFoundError, UnAuthenticatedError } from "../errors";
import { comparePassword, createJWT, getUniqueUsername } from "../utils/auth";
import { StatusCodes } from "http-status-codes";
import { ONE_MONTH } from "../utils/constants/duration";
//TODO: can write net spec comments

/*<----REGISTER---->*/
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) throw new BadRequestError("Provide all required fields");

  const username: string = await getUniqueUsername(name);
  const user = await prisma.user.create({
    data: { name, email, username, password },
  });
  if (!user) throw new CustomAPIError("Some Error occurred.");
  res.status(StatusCodes.CREATED).json({ status: StatusCodes.CREATED });
};

/*<------LOGIN----->*/
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError("Provide all required fields");

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) throw new NotFoundError("User not found");

  //verify password
  const storedPassword = user.password;
  const isMatch = await comparePassword(password, storedPassword);
  if (!isMatch) throw new UnAuthenticatedError("Password is incorrect");

  //create jwt
  const token = createJWT({ userId: user.username }); //username is userId
  //send status

  res
    .cookie("accessToken", token, {
      // httpOnly: true,
      sameSite: true,
      // secure: true,
      maxAge: ONE_MONTH,
    })
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK }); //rtk query expects json response(when not set explicitly)
};

/*<----GET_USER---->*/
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await prisma.user.findFirst({
    where: { username: id }, //username is id
    include: { savedPosts: { select: { id: true } } },
  });

  if (!user) throw new NotFoundError("User not found");

  res.status(StatusCodes.OK).json({ data: { ...user, password: undefined } });
};

/*<----EDIT_USER---->*/
export const editUser = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { name, about } = req.body;
  const updateFields: Record<string, string> = {};
  if (name) updateFields.name = name;
  if (about) updateFields.about = about;
  const user = await prisma.user.update({
    where: { username: id },
    data: {
      name,
      about,
    },
  });
  if (!user) throw new CustomAPIError("Error updating user");
  res.status(StatusCodes.OK).json({ status: StatusCodes.OK });
};
