import { createSlice } from "@reduxjs/toolkit";
const myTotalState = {
  data: [],
};

const myTotalSlice = createSlice({
  name: "myTotal",
  initialState: myTotalState,
  reducers: {
    updateMyTotal: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const myTotalActions = myTotalSlice.actions;
export default myTotalSlice.reducer;
