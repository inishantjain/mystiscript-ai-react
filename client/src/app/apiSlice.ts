// apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, RegisterRequest } from "../pages/Authentication/types";
import { setUser } from "../pages/UserProfile/userSlice";
import toast from "react-hot-toast";
import { EditUserRequest, User } from "../pages/UserProfile/types";
import { Post } from "../pages/Post/types";
import { setPost } from "../pages/Post/postSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), //we can write our base query in axios also
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginRequest>({
      query: (form) => ({
        url: "/auth/login",
        method: "POST",
        body: form,
        credentials: "include",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(api.endpoints.getUser.initiate(null));
        } catch (error: any) {
          if (error?.error?.data?.msg) toast.error(error.error.data.msg);
          else toast.error("Something went wrong");
          console.error("Error : ", error);
        }
      },
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
    }),
    getUser: builder.query<User, null>({
      query() {
        return {
          url: "/auth/getUser",
          credentials: "include", // send with credentials(cookies)
        };
      },
      transformResponse: (result: { data: User }) => result.data, //like a middleware
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        localStorage.removeItem("user");
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("user", JSON.stringify(data));
          dispatch(setUser(data));
        } catch (error) {
          console.error("getUser Api Error :", error);
        }
      },
    }),
    editUser: builder.mutation<void, EditUserRequest>({
      query(formData) {
        return {
          url: "/auth/editUser",
          method: "PATCH",
          body: formData,
          credentials: "include",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(api.endpoints.getUser.initiate(null));
        } catch (error) {
          console.error("getUser Api Error :", error);
        }
      },
    }),
    getPost: builder.query<Post, string>({
      query(postId) {
        return {
          url: `post/${postId}`,
        };
      },
      transformResponse: (result: { data: Post }) => result.data,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPost(data));
        } catch (error) {
          console.error("getPost Api Error :", error);
        }
      },
    }),

    getPostPagination: builder.query<Post[], { page: number; count: number }>({
      query({ page, count }) {
        return {
          url: `post/?page=${page}&count=${count}`,
        };
      },
    }),

    getUserPosts: builder.query<Post[], string>({
      query(username) {
        return {
          url: `post/getUserPosts/q?userId=${username}`,
        };
      },
    }),
    createPost: builder.mutation<string, PostCreationRequest>({
      query(data) {
        return {
          method: "POST",
          body: data,
          url: "/post/create",
          credentials: "include",
        };
      },
    }),

    likePost: builder.mutation<void, string>({
      query: (postId) => {
        return {
          method: "PATCH",
          body: { postId },
          url: "/post/like",
          credentials: "include",
        };
      },
    }),

    savePost: builder.mutation<void, string>({
      query: (postId) => {
        return {
          method: "PATCH",
          body: { postId },
          url: "/post/save",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useEditUserMutation,
  useGetPostQuery,
  useGetPostPaginationQuery,
  useGetUserPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useSavePostMutation,
} = api;
