import { createSlice } from "@reduxjs/toolkit";

const loggedInState = {
  data: false,
};

const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: loggedInState,
  reducers: {
    true: (state) => {
      state.data = true;
    },
    false: (state) => {
      state.data = false;
    },
  },
});

export const isLoggedInActions = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
