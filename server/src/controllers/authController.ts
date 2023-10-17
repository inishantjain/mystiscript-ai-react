import { Request, Response } from "express";
import { prisma } from "../config/database";
import { BadRequestError, CustomAPIError, NotFoundError, UnAuthenticatedError } from "../errors";
import { comparePassword, createJWT, getUniqueUsername } from "../utils/auth";
import { StatusCodes } from "http-status-codes";
import { FIVE_MINUTES, ONE_MONTH } from "../utils/constants/duration";
import crypto from "crypto";
import { mailSender } from "../utils/emails/mailSender";
import { setPasswordTemplate } from "../utils/emails/setPasswordTemplate";
import { accountCreationTemplate } from "../utils/emails/accountCreationTemplate";
import bcrypt from "bcryptjs";

/*<-------REGISTER------->*/
export const register = async (req: Request, res: Response) => {
  // Extract name and email from the request body
  const { name, email } = req.body;

  // Check if name and email are provided in the request body
  if (!name || !email) throw new BadRequestError("Provide all required fields");

  // Generate a temporary password as a random hex string
  let temporaryPassword = crypto.randomBytes(6).toString("hex");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(temporaryPassword, salt);
  // Generate a random token for updating the password
  let passwordResetToken = crypto.randomBytes(32).toString("hex");

  // Create a URL for updating the password using the generated token
  const url = process.env.CORS_URL + `/update-password/${passwordResetToken}`;

  // Generate an email template for account creation with the user's name, temporary password, and the password reset URL
  const template = accountCreationTemplate(name, temporaryPassword, url);

  // Send the email using the mailSender function
  await mailSender(email, template.subject, template.html);

  // Generate a unique username for the user based on their name
  const username: string = await getUniqueUsername(name);

  // Create a new user record in the database
  const user = await prisma.user.create({
    data: { name, email, username, password: hashedPassword },
  });

  // Check if user creation was successful, and send a response accordingly
  if (!user) throw new CustomAPIError("Some Error occurred.");

  // Create a token record associated with the user for password reset
  await prisma.token.create({
    data: { username: user.username, token: passwordResetToken },
  });

  res.status(StatusCodes.CREATED).json({ status: StatusCodes.CREATED });
};

/*<--SEND_PASSWORD_EMAIL-->*/
export const passwordTokenEmail = async (req: Request, res: Response) => {
  // Extract the email parameter from the request URL
  const email = req.params.email;

  // Find the user with the provided email in the database
  const user = await prisma.user.findFirst({ where: { email } });

  // Check if a user with the provided email exists
  if (!user) throw new NotFoundError("User not found");

  // Generate a random token for resetting the password as a hex string
  let resetToken = crypto.randomBytes(32).toString("hex");

  // Create or update a token record associated with the user for password reset
  await prisma.token.upsert({
    create: { username: user.username, token: resetToken },
    where: { username: user.username },
    update: { createdAt: new Date(), token: resetToken },
  });

  // Create a URL for updating the password using the generated token
  const url = process.env.CORS_URL + `/update-password/${resetToken}`;

  // Generate an email template for setting the password with the user's name and the password reset URL
  const template = setPasswordTemplate(user.name, url);

  // Send the email using the mailSender function
  await mailSender(email, template.subject, template.html);

  // Respond with a success message
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
      sameSite: "none", //lax doesn't work for chrome and edge browsers
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
