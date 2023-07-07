import { createSlice } from "@reduxjs/toolkit";
const totalState = {
  data: [],
};

const totalSlice = createSlice({
  name: "total",
  initialState: totalState,
  reducers: {
    updateTotal: (state, action) => {
      const data = Object.entries(action.payload).map((elem) => {
        return {
          name: elem[0].split("(")[0],
          AmountPerServing: elem[1],
        };
      });
      state.data = data;
    },
  },
});

export const totalActions = totalSlice.actions;
export default totalSlice.reducer;
