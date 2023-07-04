import { configureStore } from "@reduxjs/toolkit";
import vitaminListReducer from "./vitaminList-reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, vitaminListReducer);

export const store = configureStore({
  reducer: {
    vitaminList: persistedReducer
  },
  middleware:[thunk]
});

export const persistor = persistStore(store)