import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  MoneroWalletFull,
  MoneroWalletListener,
  SyncProgressListener,
} from "monero-javascript";

import { RootState } from "../store";

interface WithExtraWallet {
  state: RootState;
  extra: {
    wallet?: MoneroWalletFull;
  };
  rejectValue: boolean;
  fullfillValue: boolean;
}

let listener: MoneroWalletListener;

const createSyncProgressListener = (onSyncProgress: SyncProgressListener) =>
  new (class extends MoneroWalletListener {
    onSyncProgress(
      height: number,
      startHeight: number,
      endHeight: number,
      percentDone: number,
      message: string
    ) {
      onSyncProgress(height, startHeight, endHeight, percentDone, message);
    }
  })() as MoneroWalletListener;

export const progress = createAction<number>("synchronisation/progress");

export const start = createAsyncThunk<boolean, void, WithExtraWallet>(
  "synchronisation/start",
  async (_, thunkApi) => {
    listener = createSyncProgressListener(
      (
        height: number,
        startHeight: number,
        endHeight: number,
        percentDone: number,
        message: any
      ) => {
        console.log("progress");
        const percentage = Math.floor(percentDone * 100);

        if (percentage) {
          if (thunkApi.getState().synchronisation.progress !== percentage) {
            thunkApi.dispatch(progress(percentage));
          }
        }
      }
    );

    await thunkApi.extra.wallet?.addListener(listener);
    await thunkApi.extra.wallet?.setSyncHeight(995039);
    await thunkApi.extra.wallet?.startSyncing();

    return true;
  }
);

export const close = createAsyncThunk<boolean, void, WithExtraWallet>(
  "synchronisation/stop",
  async (_, thunkApi) => {
    await thunkApi.extra.wallet?.stopSyncing();

    return true;
  }
);

type SynchronisationState = {
  progress: number;
};

const slice = createSlice({
  name: "wallet",
  initialState: {
    progress: 0,
  } as SynchronisationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(progress, (state, action) => {
      state.progress = action.payload;
    });
  },
});

const { actions, reducer } = slice;

export const {} = actions;

export default reducer;
