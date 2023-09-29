import { Request, Response } from "express";
import { prisma } from "../config/database";
import { BadRequestError, CustomAPIError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";

/*<----CREATE_POST--->*/
export const createPost = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { title, content, prompt } = req.body;
  const newPost = await prisma.post.create({
    data: { title, content, prompt, authorId: id },
  });

  if (!newPost) throw new CustomAPIError("Trouble in creating post");

  res.status(StatusCodes.CREATED).json({ message: "Post created successfully", postId: newPost.id });
};

/*<----GET_POST_BYid--->*/
export const getPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: { author: true, likedBy: { select: { username: true, name: true } } },
  });

  if (!post /*==null*/) throw new NotFoundError("No post found with id " + postId);
  post.author["password"] = "_"; // {hack} obfuscate the password

  res.status(StatusCodes.OK).json({ data: post });
};

/*<-----DELETE_POST---->*/
export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const post = await prisma.post.delete({ where: { id: postId } });

  if (!post /*==null*/) throw new NotFoundError("No post found with id " + postId);

  res.status(StatusCodes.OK).json({ message: "Post deleted successfully" });
};

/*<----GET_USER_POSTS--->*/
export const getUserPosts = async (req: Request, res: Response) => {
  const username = req.query.userId as string;
  if (!username) throw new BadRequestError("Provide a userId query parameter");

  const posts = await prisma.post.findMany({
    where: { authorId: username },
    include: { author: true },
  });

  if (!posts) throw new NotFoundError("No posts found");

  res.status(200).json(posts);
};

/*<------GET_POST(pagination)----->*/
export const getPosts = async (req: Request, res: Response) => {
  const { page = "1", count = "10" }: { page?: string; count?: string } = req.query;
  const pageNum = parseInt(page) || 1; //can be NaN
  const countNum = parseInt(count) || 10;

  const offset = (pageNum - 1) * countNum;

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: countNum,
    include: { author: true },
  });

  res.status(StatusCodes.OK).json(posts);
};

/*<----SAVE_POST--->*/
export const savePost = async (req: Request, res: Response) => {
  const postId = req.body.postId;
  if (!postId) throw new BadRequestError("Provide a post ID");
  const username = req.user.id;
  const post = await prisma.post.findFirst({ where: { id: postId } });
  if (!post) throw new NotFoundError(`No post found with id ${postId}`);

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      savedPosts: {
        where: { id: postId },
      },
    },
  });

  if (user && user.savedPosts.length > 0) {
    //post already saved then un save
    await prisma.user.update({
      where: { username: username },
      data: { savedPosts: { disconnect: post } },
    });
  } else {
    //save post if not saved
    await prisma.user.update({
      where: { username: username },
      data: { savedPosts: { connect: post } },
    });
  }
  if (!user)
    //TODO: handle error thrown by prisma client
    throw new CustomAPIError(`Error updating saved posts`);
  res.status(StatusCodes.OK).json({ status: StatusCodes.OK });
};

/*<----LIKE_POST--->*/
export const likePost = async (req: Request, res: Response) => {
  const postId = req.body.postId;
  if (!postId) throw new BadRequestError("Provide a post ID");
  const username = req.user.id;
  const post = await prisma.post.findFirst({ where: { id: postId } });
  if (!post) throw new NotFoundError(`No post found with id ${postId}`);

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      likedPosts: {
        where: { id: postId },
      },
    },
  });
  if (user && user.likedPosts.length > 0) {
    //post already upvote
    //withdraw upvote then
    await prisma.user.update({
      where: { username: username },
      data: { likedPosts: { disconnect: post } },
    });
  } else {
    //upvote post
    await prisma.user.update({
      where: { username: username },
      data: { likedPosts: { connect: post } },
    });
  }
  if (!user)
    //TODO: handle error thrown by prisma client
    throw new CustomAPIError(`Error up like posts`);
  res.status(StatusCodes.OK).json({ status: StatusCodes.OK });
};
