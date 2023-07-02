import { configureStore } from "@reduxjs/toolkit";
import vitaminListReducer from "./vitaminList-reducer";


const store = configureStore({
  reducer: {
    vitaminList: vitaminListReducer
  },
});

export default store;