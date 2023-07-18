import { createSlice } from "@reduxjs/toolkit";
const myTotalState = {
  data: [],
};

const myTotalSlice = createSlice({
  name: "myTotal",
  initialState: myTotalState,
  reducers: {
    updateMyTotal: (state, action) => {
      const data = Object.entries(action.payload).map((elem) => {
        return {
          fullname: elem[0],
          name: elem[0].split("(")[0],
          AmountPerServing: elem[1],
        };
      });
      state.data = data;
    },
  },
});

export const myTotalActions = myTotalSlice.actions;
export default myTotalSlice.reducer;
