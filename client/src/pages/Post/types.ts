import { User } from "../UserProfile/types";

export interface Post {
  id: string;
  title: string;
  content: string;
  prompt: string;
  likedBy: { name: string; username: string }[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: User;
}

export interface PostPaginationRequest {}
