import {
  editUser,
  getUser,
  login,
  passwordTokenEmail,
  register,
  setAccountPassword,
} from "../controllers/authController";
import express from "express";
import { hashPasswordMiddleware } from "../middlewares/hash-password";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/send-password-mail/:email", passwordTokenEmail);
router.post(["/set-password/:token", "/reset-password/:token"], hashPasswordMiddleware, setAccountPassword);
router.post("/login", login);
router.get("/getUser", authMiddleware, getUser);
router.patch("/editUser", authMiddleware, editUser);
export default router;
