import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  savePost,
  likePost,
} from "../controllers/postController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/create", authMiddleware, createPost);
router.route("/:postId").get(getPost).delete(authMiddleware, deletePost);
router.get("/getUserPosts/q", getUserPosts);
router.get("/", getPosts); //getPost by pagination
router.patch("/save", authMiddleware, savePost);
router.patch("/like", authMiddleware, likePost);
// router.patch('/unsave', )
export default router;
