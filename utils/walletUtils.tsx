"use client";
import * as bip39 from "bip39";
import { ethers } from "ethers";

export const generateMnemonic = (): string => {
  return bip39.generateMnemonic();
};

export const createWallet = (mnemonic: string) => {
  return ethers.Wallet.fromMnemonic(mnemonic);
};

export const getPublicKey = (wallet: ethers.Wallet): string => {
  return wallet.publicKey;
};
