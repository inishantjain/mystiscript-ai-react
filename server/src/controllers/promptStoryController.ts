import { Request, Response } from "express";
import { requestStory } from "../utils/requestStory";
import { BadRequestError, CustomAPIError } from "../errors";

/*<----GENERATE_STORY--->*/
export const generatePromptStory = async (req: Request, res: Response) => {
  const prompt = req.body.prompt;
  if (!prompt) throw new BadRequestError("Prompt not provided");

  res.status(200).set({
    "Content-Type": "text/plain",
    "Transfer-Encoding": "chunked",
    Connection: "keep-alive",
  });

  const storyStream = await requestStory(prompt);

  if (!storyStream) throw new CustomAPIError("Story generation failed");

  for await (const part of storyStream) {
    const data = part.choices[0].delta?.content;
    if (data) res.write(data);
  }
  res.end();
  return;
  // return res.status(200).json(storyStream);
};
