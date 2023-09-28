import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

interface UserState {
  user: User | null;
}

// Get the user data from localStorage
const userFromLocalStorage = localStorage.getItem("user");

const initialState: UserState = {
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("user");
      return { user: null };
      // initialState
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  // extraReducers: {},//deprecated
});
export default userSlice.reducer;
export const { logout, setUser } = userSlice.actions;
