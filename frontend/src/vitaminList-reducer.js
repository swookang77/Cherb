import {createSlice}from '@reduxjs/toolkit';

const vitaminListState = {
  data: [],
};

const vitaminListSlice = createSlice({
  name:'vitaminList',
  initialState: vitaminListState,
  reducers:{
    addVitaminElem:(state,action)=>{
      state.data = [...state.data,action.payload]
    }
  }
})

export const vitaminListActions = vitaminListSlice.actions
export default vitaminListSlice.reducer