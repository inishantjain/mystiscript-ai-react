// import axios from "axios";
import OpenAI from "openai";
import { CustomAPIError } from "../errors";
import { Stream } from "openai/streaming";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const requestStory = async (prompt: string): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a story generator that only generate stories and nothing else under 150 words. Provide a title for the story in the very first line strictly. The title should be a simple, standalone line and should not be indicated by using the word 'title.', if any prompt goes against you guidelines just respond with an empty string",
        },
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
      stream: true,
    });
    return chatCompletion;
  } catch (error) {
    throw new CustomAPIError("Error while generating openai response");
  }
};
// requestStory("programmer");
