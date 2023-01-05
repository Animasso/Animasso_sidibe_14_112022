import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import employeeReducer from "./Features/employeeSlice";
import { persistReducer, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  employeeList: employeeReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [REGISTER],
    },
  }),
  devTools: true,
});

export default store;
