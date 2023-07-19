import { configureStore } from "@reduxjs/toolkit";
import vitaminListReducer from "./reducers/vitaminList-reducer";
import myVitaminListReducer from "./reducers/my-vitaminList-reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import totalReducer from "./reducers/total-reducer";
import myTotalReducer from "./reducers/my-total-reducer";

const vitaminListReducerPersistConfig = {
  key: "vitaminList",
  storage,
};
const totalReducerPersistConfig = {
  key: "total",
  storage,
};
const myVitaminListReducerPersistConfig = {
  key: "myVitaminList",
  storage,
};
const myTotalReducerPersistConfig = {
  key: "myTotal",
  storage,
};
const persistedVitaminListReducer = persistReducer(vitaminListReducerPersistConfig, vitaminListReducer);

const persistedTotalReducer = persistReducer(totalReducerPersistConfig, totalReducer);

const persistedMyVitaminListReducer = persistReducer(myVitaminListReducerPersistConfig, myVitaminListReducer);

const persistedMyTotalReducer = persistReducer(myTotalReducerPersistConfig,myTotalReducer);


export const store = configureStore({
  reducer: {
    vitaminList: persistedVitaminListReducer,
    total: persistedTotalReducer,
    myVitaminList: persistedMyVitaminListReducer,
    myTotal: persistedMyTotalReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
