import { createSlice } from "@reduxjs/toolkit";
const totalState = {
  data: [],
};

const totalSlice = createSlice({
  name: "total",
  initialState: totalState,
  reducers: {
    updateTotal: (state, action) => {
      const data = Object.entries(action.payload).map((key, value) => {
        return {
          name: key.split("(")[0],
          AmountPerServing: value,
        };
      });
      state.data = data;
    },
  },
});

export const totalActions = totalSlice.actions;
export default totalSlice.reducer;
