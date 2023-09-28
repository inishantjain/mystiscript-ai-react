import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "../pages/UserProfile/userSlice";
import { api } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import postReducer from "../pages/Post/postSlice";

const store = configureStore({
  devTools: import.meta.env.VITE_ENV !== "production",
  reducer: {
    userState: userReducer,
    postState: postReducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch); //set listeners such as visibility change, online offline,focus, etc

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

//export these typed versions instead of defining them in each consumer
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
