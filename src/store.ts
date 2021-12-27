import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";

import synchronisation from "./features/synchronisation";
import wallet from "./features/wallet";

const logger = createLogger({ collapsed: true });

const reducer = combineReducers({
  synchronisation,
  wallet,
});

const thunk = {
  extraArgument: {
    wallet: undefined,
  },
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk }).concat([logger]),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
