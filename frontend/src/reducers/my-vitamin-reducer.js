import { createSlice } from "@reduxjs/toolkit";

const myVitaminListState = {
  data: [],
};

const myVitaminListSlice = createSlice({
  name: "myVitaminList",
  initialState: myVitaminListState,
  reducers: {
    updateMyVitaminList: (state, action) => {
      state.data = action.payload
    },
  },
});
export const myVitaminListActions = myVitaminListSlice.actions;
export default myVitaminListSlice.reducer;
