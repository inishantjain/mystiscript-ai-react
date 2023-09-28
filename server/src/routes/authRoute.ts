import { editUser, getUser, login, register } from "../controllers/authController";
import express from "express";
import { hashPasswordMiddleware } from "../middlewares/hash-password";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/register", hashPasswordMiddleware, register);
router.post("/login", login);
router.get("/getUser", authMiddleware, getUser);
router.patch("/editUser", authMiddleware, editUser);
export default router;
