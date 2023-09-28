import express from "express";
import { generatePromptStory } from "../controllers/promptStoryController";
const router = express.Router();

router.post("/generatePrompt", generatePromptStory);
export default router;
