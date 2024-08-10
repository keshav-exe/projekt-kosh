"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Copy, EyeOff, Eye, ChevronDown, ChevronUp, Trash } from "lucide-react";
import { toast } from "sonner";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import bs58 from "bs58";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
}

const WalletGenerator: React.FC = () => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(
    Array(12).fill(" ")
  );
  const [seed, setSeed] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<boolean>(false);
  const [mnemonicInput, setMnemonicInput] = useState<string>("");
  const [showStoredMnemonics, setShowStoredMnemonics] =
    useState<boolean>(false);

  useEffect(() => {
    // Retrieve wallets from local storage on component mount
    const storedWallets = localStorage.getItem("wallets");
    if (storedWallets) {
      setWallets(JSON.parse(storedWallets));
    }
  }, []);

  const handleGenerateWallet = async () => {
    let mnemonic = mnemonicInput.trim();
    if (mnemonic) {
      if (!validateMnemonic(mnemonic)) {
        toast.error("Invalid recovery phrase. Please try again.");
        return;
      }
    } else {
      mnemonic = generateMnemonic();
    }

    const words = mnemonic.split(" ");
    setMnemonicWords(words);

    try {
      const seedBuffer = mnemonicToSeedSync(mnemonic);
      setSeed(seedBuffer.toString("hex"));

      // Generate a single wallet
      const path = `m/44'/501'/0'/0'`;
      const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));
      const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
      const keypair = Keypair.fromSecretKey(secretKey);

      // Encode both private and public keys to base58
      const privateKeyBase58 = bs58.encode(secretKey);
      const publicKeyBase58 = keypair.publicKey.toBase58();

      // Create a new wallet and append it to the list
      const newWallet: Wallet = {
        publicKey: publicKeyBase58,
        privateKey: privateKeyBase58,
        mnemonic: mnemonic,
      };

      const updatedWallets = [...wallets, newWallet];
      setWallets(updatedWallets);
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      toast.success("Wallet generated successfully.");
    } catch (error) {
      toast.error("Failed to generate wallet. Please try again.");
    }
  };

  const handleClearWallets = () => {
    localStorage.removeItem("wallets");
    setWallets([]);
    toast.success("All wallets cleared.");
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="tracking-tighter text-5xl font-extrabold text-primary">
            Projekt-Kosh
          </h1>
          <span className="text-lg tracking-tight text-primary/75 font-medium">
            A personal web-3 wallet for{" "}
            <Link
              href={"https://x.com/kirat_tw"}
              className="font-bold text-primary"
            >
              Harkirat&apos;s
            </Link>{" "}
            cohort 3.0 assignment.
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Input
            type="password"
            placeholder="Enter Your Recovery Phrase (or leave blank to generate)"
            onChange={(e) => setMnemonicInput(e.target.value)}
            value={mnemonicInput}
          />
          <Button onClick={() => handleGenerateWallet()}>
            Generate Wallet
          </Button>
        </div>
      </motion.div>
      {mnemonicWords.some((word) => word !== " ") && wallets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="group flex flex-col items-center gap-4 cursor-pointer rounded-lg border border-primary/10 p-8"
        >
          <div className="flex w-full justify-between items-center">
            <h2 className="text-xl md:text-3xl font-bold tracking-tighter">
              Current Secret Phrase
            </h2>
            <Button
              onClick={() => setShowMnemonic(!showMnemonic)}
              variant="ghost"
            >
              {showMnemonic ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
          </div>

          {showMnemonic && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="flex flex-col w-full items-center justify-center"
              onClick={() => copyToClipboard(mnemonicWords.join(" "))}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8"
              >
                {mnemonicWords.map((word, index) => (
                  <p
                    key={index}
                    className="md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4"
                  >
                    {word}
                  </p>
                ))}
              </motion.div>
              <div className="text-sm md:text-base text-primary/50 flex w-full gap-2 items-center group-hover:text-primary/80 transition-all duration-300">
                <Copy className="size-4" /> Click Anywhere To Copy
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Display wallet pairs */}
      {wallets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-8 mt-6"
        >
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <h3 className="text-xl md:text-3xl font-bold tracking-tighter">
              {" "}
              Existing Wallets
            </h3>
            <div className="flex items-center gap-2 w-full flex-wrap">
              <Button
                variant="outline"
                size={"sm"}
                onClick={() => setShowPrivateKeys(!showPrivateKeys)}
                className="flex gap-2 items-center"
              >
                {showPrivateKeys ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                {showPrivateKeys ? "Hide Private Key" : "Show Private Key"}
              </Button>
              <Button
                variant="outline"
                size={"sm"}
                onClick={() => setShowStoredMnemonics(!showStoredMnemonics)}
                className="flex gap-2 items-center"
              >
                {showStoredMnemonics ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                {showStoredMnemonics ? "Hide Phrases" : "Show Phrases"}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    variant={"destructive"}
                    size={"sm"}
                    className="flex gap-2 items-center"
                  >
                    {" "}
                    <Trash className="size-4" /> Clear Wallets
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your saved wallets.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleClearWallets()}
                      className="bg-red-950 text-white"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          {wallets.map((wallet, index) => (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              key={index}
              className="group flex flex-col gap-8 rounded-lg border border-primary/10 p-8"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tighter">
                    Wallet {index + 1}
                  </h3>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div
                    onClick={() => copyToClipboard(wallet.publicKey)}
                    className="flex flex-col md:flex-row w-full gap-2 cursor-pointer transition-all duration-300 group"
                  >
                    <h5 className="tracking-tight font-semibold">Public:</h5>
                    <div className="w-full flex justify-between text-primary/60 hover:text-primary items-center gap-4">
                      <p className="truncate">{wallet.publicKey}</p>
                      <Copy className="hidden md:flex size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                  <div
                    onClick={() => copyToClipboard(wallet.privateKey)}
                    className="flex flex-col md:flex-row w-full gap-2 cursor-pointer transition-all duration-300 group"
                  >
                    <h5 className="tracking-tight font-semibold">Private:</h5>
                    <div className="w-full flex justify-between text-primary/60 hover:text-primary items-center gap-4">
                      <p className="truncate">
                        {showPrivateKeys
                          ? wallet.privateKey
                          : "•".repeat(wallet.privateKey.length)}
                      </p>
                      <Copy className="hidden md:flex size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                  <div
                    onClick={() => copyToClipboard(wallet.mnemonic)}
                    className="flex flex-col md:flex-row w-full gap-2 cursor-pointer transition-all duration-300 group"
                  >
                    <h5 className="tracking-tight font-semibold">Phrases:</h5>
                    <div className="w-full flex justify-between text-primary/60 hover:text-primary items-center gap-4">
                      <p className="truncate">
                        {showStoredMnemonics
                          ? wallet.mnemonic
                          : "•".repeat(wallet.mnemonic.length)}
                      </p>
                      <Copy className="hidden md:flex size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default WalletGenerator;
