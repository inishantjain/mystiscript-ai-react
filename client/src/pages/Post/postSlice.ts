import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "./types";

interface PostState {
  post: Post | null;
}
const initialState: PostState = {
  post: null,
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload;
    },
  },
});

export default postSlice.reducer;
export const { setPost } = postSlice.actions;
