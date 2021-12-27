import { open, close } from "../features/wallet";
import store from "../store";

// TODO: Use env variables
const MNEMONIC = `<MNEMONIC>`;

it("open wallet", async () => {
  expect(store.getState().wallet.open).toEqual(false);

  await store.dispatch(open(MNEMONIC));

  expect(store.getState().wallet.open).toEqual(true);

  await store.dispatch(close());

  expect(store.getState().wallet.open).toEqual(false);
}, 60000);

export {};
