import { configureStore } from "@reduxjs/toolkit";
import vitaminListReducer from "./reducers/vitaminList-reducer";
import myVitaminListReducer from "./reducers/my-vitaminList-reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import totalReducer from "./reducers/total-reducer";
import myTotalReducer from "./reducers/my-total-reducer";
import isLoggedInReducer from "./reducers/is-logged-in";

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
const isLoggedInReducerPersistConfig = {
  key: "isLoggedIn",
  storage,
};
const persistedVitaminListReducer = persistReducer(vitaminListReducerPersistConfig, vitaminListReducer);

const persistedTotalReducer = persistReducer(totalReducerPersistConfig, totalReducer);

const persistedMyVitaminListReducer = persistReducer(myVitaminListReducerPersistConfig, myVitaminListReducer);

const persistedMyTotalReducer = persistReducer(myTotalReducerPersistConfig,myTotalReducer);

const persistedIsLoggedInReducer = persistReducer(isLoggedInReducerPersistConfig, isLoggedInReducer);

export const store = configureStore({
  reducer: {
    vitaminList: persistedVitaminListReducer,
    total: persistedTotalReducer,
    isLoggedIn: persistedIsLoggedInReducer,
    myVitaminList: persistedMyVitaminListReducer,
    myTotal: persistedMyTotalReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);

export const resetSpecificKey = (key) => {
  persistor.pause(); // persistor 일시 중지

  const state = store.getState();
  const persistedKey = `${key}PersistConfig`;

  if (state[persistedKey]) {
    persistor.purge([persistedKey]); // 특정 키의 상태 초기화
  }
  persistor.persist(); // persistor 다시 시작
};