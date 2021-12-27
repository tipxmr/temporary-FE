declare module "monero-javascript" {
  export enum MoneroTxPriority {
    DEFAULT = 0,
    UNIMPORTANT = 1,
    NORMAL = 2,
    ELEVATED = 3,
  }

  export interface MoneroTxConfig {
    accountIndex: number;
    amount: BigInt;
    address: string;
    relay: boolean;
    priority: MoneroTxPriority;
  }

  export interface MoneroTxWallet {}

  export interface MoneroWalletConfig {
    mnemonic?: string;
    networkType: string;
    password: string;
    serverUri: string;
    serverUsername: string;
    serverPassword: string;
    language?: string;
    rejectUnauthorized: boolean;
  }

  declare interface MoneroWallet {
    async createTx(config: MoneroTxConfig): MoneroTxWallet;
    async close();
    async addListener(listener: MoneroWalletListener);
  }

  declare class MoneroWalletFull implements MoneroWallet {
    async close();
    async getMnemonic(): string;
    async getPrimaryAddress(): string;
    async addListener(listener: MoneroWalletListener);
    async removeListener(listener: MoneroWalletListener);
    async startSyncing();
    async stopSyncing();
    async getListeners(): MoneroWalletListener[];
    async setSyncHeight(height: number);
  }

  export function createWalletFull(
    config: MoneroWalletConfig
  ): MoneroWalletFull;

  export type SyncProgressListener = (height: number, startHeight: number, endHeight: number, percentDone: number, message: string) => void;
  export type BalancesChangedListener = (newBalance: BigInteger, newUnlockedBalance: BigInteger) => void;

  declare abstract class MoneroWalletListener {
    async onBalancesChanged: BalancesChangedListener;

    async onSyncProgress(height: number, startHeight: number, endHeight: number, percentDone: number, message: string): void;
    async onNewBlock(height: number): void;
  }
}
