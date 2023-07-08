import { createSlice } from "@reduxjs/toolkit";

const vitaminListState = {
  data: [],
};

const vitaminListSlice = createSlice({
  name: "vitaminList",
  initialState: vitaminListState,
  reducers: {
    //{uuid,title}을 전달받아 기존 배열에 추가.
    addVitaminElem(state, action){
      console.log(state);
      state.data = [...state.data, action.payload];
    },
    //uuid를 전달받아 기존 배열에서 uuid와 일치하는 객체 삭제.
    deleteVitaminElem(state, action){
      const oldArr = state.data;
      const newArr = oldArr.filter((obj) => obj.uuid !== action.payload);
      state.data = newArr;
    },
  },
});

export const {addVitaminElem,deleteVitaminElem} = vitaminListSlice.actions
export default vitaminListSlice.reducer;
