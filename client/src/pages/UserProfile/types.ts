export interface User {
  name: string;
  email: string;
  username: string;
  savedPosts: { id: string }[];
  about: string;
  // myPosts:
}

export interface EditUserRequest {
  name?: string;
  about?: string;
}
