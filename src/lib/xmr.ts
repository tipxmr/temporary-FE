/// <reference path="xmr.d.ts"/>
import monero, { MoneroWallet, MoneroWalletFull } from "monero-javascript";

// TODO: Use env variables
export async function create() {
  return monero.createWalletFull({
    networkType: "stagenet",
    language: "English",
    password: "pass123",
    serverUri: "http://localhost:38081",
    serverUsername: "superuser",
    serverPassword: "abctesting123",
    rejectUnauthorized: false, // e.g. local development
  });
}

// TODO: Use env variables
export async function openFromSeed(mnemonic: string) {
  return monero.createWalletFull({
    mnemonic,
    networkType: "stagenet",
    password: "pass123",
    serverUri: "http://localhost:38081",
    serverUsername: "superuser",
    serverPassword: "abctesting123",
    rejectUnauthorized: false, // e.g. local development
  });
}

export async function getPrimaryAddress(wallet: MoneroWalletFull) {
  return wallet.getPrimaryAddress();
}

export function createSubaddress() {}

export function getMnemonic() {}

export function getMnemonicHash() {}

export function getTransactions() {}

export function generateQrCode() {}

export function isValidMnemoicLength() {}

export function isValidAddress() {}

export function createTransaction(
  wallet: MoneroWallet,
  address: string,
  amount: number
) {
  return wallet.createTx({
    accountIndex: 0,
    address,
    amount: BigInt(Math.round(amount * Math.pow(10, 12))),
    relay: true,
    priority: monero.MoneroTxPriority.UNIMPORTANT,
  });
}

export async function close(wallet: MoneroWallet) {
  wallet.close();
}
