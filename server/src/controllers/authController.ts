import { Request, Response } from "express";
import { prisma } from "../config/database";
import { BadRequestError, CustomAPIError, NotFoundError, UnAuthenticatedError } from "../errors";
import { comparePassword, createJWT, getUniqueUsername } from "../utils/auth";
import { StatusCodes } from "http-status-codes";
import { FIVE_MINUTES, ONE_MONTH } from "../utils/constants/duration";
import crypto from "crypto";
import { mailSender } from "../utils/emails/mailSender";
import { setPasswordTemplate } from "../utils/emails/setPasswordTemplate";

/*<-------REGISTER------->*/
export const register = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) throw new BadRequestError("Provide all required fields");

  const username: string = await getUniqueUsername(name);
  const user = await prisma.user.create({
    data: { name, email, username, password: String(Math.floor(Math.random() * 10000000)) },
  });
  if (!user) throw new CustomAPIError("Some Error occurred.");
  res.status(StatusCodes.CREATED).json({ status: StatusCodes.CREATED });
};

/*<--SEND_PASSWORD_EMAIL-->*/
export const passwordTokenEmail = async (req: Request, res: Response) => {
  const email = req.params.email; //TODO: from query or body
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new NotFoundError("User not found");
  let resetToken = crypto.randomBytes(32).toString("hex");

  await prisma.token.upsert({
    create: { username: user.username, token: resetToken }, //create or update token
    where: { username: user.username },
    update: { createdAt: new Date(), token: resetToken },
  });

  const url = process.env.CORS_URL + `/update-password/${resetToken}`;
  const template = setPasswordTemplate(email, user.name, url);

  await mailSender(email, template.subject, template.html);

  res.json({ message: "Password update link has been sent successfully to " + email });
};

/*<---------LOGIN-------->*/
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
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      path: "/", //accessible on all routes
      // sameSite: "lax", //not working with firefox as of now
      secure: true,
      maxAge: ONE_MONTH,
    })
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK }); //rtk query expects json response(when not set explicitly)
};

/*<-------GET_USER------->*/
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await prisma.user.findFirst({
    where: { username: id }, //username is id
    include: { savedPosts: { select: { id: true } } },
  });

  if (!user) throw new NotFoundError("User not found");

  res.status(StatusCodes.OK).json({ data: { ...user, password: undefined } });
};

/*<-------EDIT_USER------->*/
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

/*<-SET_ACCOUNT_PASSWORD->*/
export const setAccountPassword = async (req: Request, res: Response) => {
  const token = req.params.token;
  const password = req.body.password;
  if (!token) throw new BadRequestError("token not provided");
  const tokenModel = await prisma.token.findFirst({ where: { token } });
  if (!tokenModel) throw new BadRequestError("Invalid token");

  //FIVE_MINUTES expiration for token
  if (tokenModel.createdAt.getTime() + FIVE_MINUTES < Date.now()) throw new BadRequestError("Token has expired");
  await prisma.token.update({ where: { username: tokenModel?.username }, data: { createdAt: new Date(0) } }); //make token expired

  const user = await prisma.user.update({ where: { username: tokenModel.username }, data: { password } });

  res.status(StatusCodes.OK).json({ message: "Password updated successfully" });
};
