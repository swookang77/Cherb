import { configureStore } from "@reduxjs/toolkit";
import vitaminListReducer from "./reducers/vitaminList-reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import totalReducer from "./reducers/total-reducer";
import myTotalReducer from "./reducers/my-total-reducer";
import myVitaminReducer from "./reducers/my-vitamin-reducer";

const vitaminListReducerPersistConfig = {
  key: "vitaminList",
  storage,
};
const myVitaminListReducerPersistConfig = {
  key: "myVitaminList",
  storage,
};
const totalReducerPersistConfig = {
  key: "total",
  storage,
};

const myTotalReducerPersistConfig = {
  key: "myTotal",
  storage,
};
const persistedVitaminListReducer = persistReducer(vitaminListReducerPersistConfig, vitaminListReducer);

const persistedMyVitaminListReducer = persistReducer(myVitaminListReducerPersistConfig, myVitaminReducer);


const persistedTotalReducer = persistReducer(totalReducerPersistConfig, totalReducer);


const persistedMyTotalReducer = persistReducer(myTotalReducerPersistConfig,myTotalReducer);


export const store = configureStore({
  reducer: {
    vitaminList: persistedVitaminListReducer,
    myVitaminList: persistedMyVitaminListReducer,
    total: persistedTotalReducer,
    myTotal: persistedMyTotalReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
