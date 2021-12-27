import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoneroWalletFull } from "monero-javascript";
import { openFromSeed } from "../lib/xmr";

interface WithExtraWallet {
  extra: {
    wallet?: MoneroWalletFull;
  };
  rejectValue: boolean;
  fullfillValue: boolean;
}

export const open = createAsyncThunk<boolean, string, WithExtraWallet>(
  "wallet/open",
  async (mnemonic, thunkApi) => {
    const wallet = await openFromSeed(mnemonic);

    thunkApi.extra.wallet = wallet;

    // const mnemonic = await wallet.getMnemonic();
    // const primaryAddress = await wallet.getPrimaryAddress();
    // console.log({ mnemonic, primaryAddress });

    return true;
  }
);

export const close = createAsyncThunk<boolean, void, WithExtraWallet>(
  "wallet/close",
  async (_, thunkApi) => {
    await thunkApi.extra.wallet?.close();

    delete thunkApi.extra.wallet;

    return true;
  }
);

type WalletState = {
  open: boolean;
  loading: string;
};

const slice = createSlice({
  name: "wallet",
  initialState: {
    open: false,
    loading: "idle",
  } as WalletState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(open.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(open.fulfilled, (state) => {
        state.loading = "idle";
        state.open = true;
      })
      .addCase(open.rejected, (state) => {
        state.loading = "idle";
      })
      .addCase(close.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(close.fulfilled, (state) => {
        state.loading = "idle";
        state.open = false;
      })
      .addCase(close.rejected, (state) => {
        state.loading = "idle";
      });
  },
});

const { actions, reducer } = slice;

export const {} = actions;

export default reducer;
