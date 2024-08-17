"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import bs58 from "bs58";
import MnemonicDisplay from "./MnemonicDisplay";
import WalletList from "./WalletList";
import { ethers } from "ethers";

interface Wallet {
  mnemonic: string[];
  setMnemonic: React.Dispatch<React.SetStateAction<string[]>>;
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string[]>>;
  mnemonicInput: string;
  setMnemonicInput: React.Dispatch<React.SetStateAction<string>>;
  handleGenerateWallet: () => void;
  pathTypes: string[];
  setPathTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const WalletSetup = ({
  mnemonic,
  path,
  setMnemonic,
  setPath,
  mnemonicInput,
  setMnemonicInput,
  handleGenerateWallet,
  pathTypes,
  setPathTypes,
}: Wallet) => {
  return (
    <motion.div
      className="flex flex-col gap-32"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="flex flex-col gap-4">
        {pathTypes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="flex gap-12 flex-col my-64"
          >
            <div className="flex flex-col gap-2">
              <h1 className="tracking-tighter text-4xl md:text-5xl font-extrabold">
                Kosh supports multiple blockchains
              </h1>
              <p className="text-primary/80 font-semibold text-lg md:text-xl">
                Choose a blockchain to get started.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size={"lg"}
                onClick={() => {
                  setPathTypes(["501"]);
                  toast.success(
                    "Wallet selected. Please generate a wallet to continue."
                  );
                }}
              >
                Solana
              </Button>
              <Button
                size={"lg"}
                onClick={() => {
                  setPathTypes(["60"]);
                  toast.success(
                    "Wallet selected. Please generate a wallet to continue."
                  );
                }}
              >
                Ethereum
              </Button>
              <Button
                size={"lg"}
                onClick={() => {
                  setPathTypes(["0"]);
                  toast.success(
                    "Wallet selected. Please generate a wallet to continue."
                  );
                }}
              >
                Bitcoin
              </Button>
            </div>
          </motion.div>
        )}
        {pathTypes.length !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="flex flex-col gap-4 my-64"
          >
            <div className="flex flex-col gap-2">
              <h1 className="tracking-tighter text-4xl md:text-5xl font-extrabold">
                Secret Recovery Phrase
              </h1>
              <p className="text-primary/80 font-semibold text-lg md:text-xl">
                Save these words in a safe place.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="password"
                placeholder="Enter your secret phrase (or leave blank to generate)"
                onChange={(e) => setMnemonicInput(e.target.value)}
                value={mnemonicInput}
              />
              <Button size={"lg"} onClick={() => handleGenerateWallet()}>
                {mnemonicInput ? "Add Wallet" : "Generate Wallet"}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WalletSetup;
