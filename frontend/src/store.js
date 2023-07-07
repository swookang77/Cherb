import { configureStore } from "@reduxjs/toolkit";
import vitaminListReducer from "./reducers/vitaminList-reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import totalReducer from "./reducers/total-reducer";

const vitaminListReducerPersistConfig = {
  key: "vitaminList",
  storage,
};
const totalReducerPersistConfig = {
  key: "total",
  storage,
};
const persistedVitaminListReducer = persistReducer(vitaminListReducerPersistConfig, vitaminListReducer);

const persistedTotalReducer = persistReducer(totalReducerPersistConfig,totalReducer)
export const store = configureStore({
  reducer: {
    vitaminList: persistedVitaminListReducer,
    total: persistedTotalReducer,
  },
  middleware:[thunk]
});

export const persistor = persistStore(store)