import { createSlice } from "@reduxjs/toolkit";

const myVitaminListState = {
  data: [],
};

const myVitaminListSlice = createSlice({
  name: "myVitaminList",
  initialState: myVitaminListState,
  reducers: {
    //{uuid,title}을 전달받아 기존 배열에 추가.
    addMyVitaminElem(state, action){
      state.data = [...state.data, action.payload];
    },
    //uuid를 전달받아 기존 배열에서 uuid와 일치하는 객체 삭제.
    deleteMyVitaminElem(state, action){
      const oldArr = state.data;
      const newArr = oldArr.filter((obj) => obj.uuid !== action.payload);
      state.data = newArr;
    },
  },
});

export const myVitaminListActions = myVitaminListSlice.actions
export default myVitaminListSlice.reducer;
