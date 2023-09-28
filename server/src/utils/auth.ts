import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/database";

export const comparePassword = async (password: string, storedPassword: string) => {
  const isMatch = await bcrypt.compare(password, storedPassword);
  return isMatch;
};
export const createJWT = ({ userId }: { userId: string }) => {
  //user's id stored as userId in the token
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export const verifyJWT = (token: string) => jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

export async function getUniqueUsername(name: string) {
  let username = name.toLowerCase().replace(/\s+/g, ""); // Convert to lowercase and remove spaces

  let randomNumber = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

  while (true) {
    // Check if the username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      return username; // Username is unique
    }

    // If the username is taken, add a counter to make it unique
    username = `${name.toLowerCase().replace(/\s+/g, "")}${randomNumber}`;
    randomNumber = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;
  }
}
