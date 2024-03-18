import { configureStore } from "@reduxjs/toolkit";

import globalStoreReducer from "./globalSlice";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  globalStore: globalStoreReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
export default store;
