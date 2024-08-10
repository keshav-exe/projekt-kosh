"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy, Key, Lock, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import bs58 from "bs58";

interface Wallet {
  publicKey: string;
  privateKey: string;
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

      const newWallets: Wallet[] = [];

      for (let i = 0; i < 4; i++) {
        const path = `m/44'/501'/${i}'/0'`;
        const { key: derivedSeed } = derivePath(
          path,
          seedBuffer.toString("hex")
        );
        const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
        const keypair = Keypair.fromSecretKey(secretKey);

        // Encode both private and public keys to base58
        const privateKeyBase58 = bs58.encode(secretKey);
        const publicKeyBase58 = keypair.publicKey.toBase58();

        newWallets.push({
          publicKey: publicKeyBase58,
          privateKey: privateKeyBase58,
        });
      }

      setWallets(newWallets);
      toast.success("Wallet generated successfully.");
    } catch (error) {
      toast.error("Failed to generate wallet. Please try again.");
    }
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
            Kosh
          </h1>
          <span className="text-lg tracking-tight text-primary/80 font-medium">
            A Personal Web3 Wallet For{" "}
            <Link href={"https://x.com/kirat_tw"} className="font-bold">
              Harkirat&apos;s
            </Link>{" "}
            Cohort 3.0 Assignment.
          </span>
        </div>
        <div className="flex gap-4 mt-6">
          <Input
            type="password"
            placeholder="Enter Your Recovery Phrase (or leave blank to generate)"
            onChange={(e) => setMnemonicInput(e.target.value)}
            value={mnemonicInput}
          />
          <Button onClick={() => handleGenerateWallet()}>
            {mnemonicWords[0] !== " " ? "Regenerate" : "Generate Wallet"}
          </Button>
        </div>
      </motion.div>

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
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className="group flex flex-col gap-8 rounded-lg border border-primary/10 p-8"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tighter">
                    Wallet {index + 1}
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center cursor-pointer transition-all duration-300 text-primary/60 hover:text-primary group">
                    <p className="truncate">{wallet.publicKey}</p>
                    <Copy
                      className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
                      onClick={() => copyToClipboard(wallet.publicKey)}
                    />
                  </div>
                  <div className="flex justify-between items-center cursor-pointer transition-all duration-300 text-primary/60 hover:text-primary group">
                    <p className="truncate">
                      {showPrivateKeys
                        ? wallet.privateKey
                        : "•".repeat(wallet.privateKey.length)}
                    </p>
                    <Copy
                      className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
                      onClick={() => copyToClipboard(wallet.privateKey)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {mnemonicWords.some((word) => word !== " ") && (
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
              Your Secret Recovery Phrase
            </h2>
            <Button
              onClick={() => setShowMnemonic(!showMnemonic)}
              variant="ghost"
            >
              {showMnemonic ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>

          {showMnemonic && (
            <div
              className="flex flex-col w-full items-center justify-center"
              onClick={() => copyToClipboard(mnemonicWords.join(" "))}
            >
              <div className="grid grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8">
                {mnemonicWords.map((word, index) => (
                  <p
                    key={index}
                    className="md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4"
                  >
                    {word}
                  </p>
                ))}
              </div>
              <div className="text-sm md:text-base text-primary/50 flex w-full gap-2 items-center group-hover:text-primary/80 transition-all duration-300">
                <Copy className="size-4" /> Click Anywhere To Copy
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default WalletGenerator;
