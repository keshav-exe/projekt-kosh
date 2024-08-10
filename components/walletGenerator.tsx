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

const WalletGenerator: React.FC = () => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(
    Array(12).fill(" ")
  );
  const [seed, setSeed] = useState<string>("");
  const [privateKeys, setPrivateKeys] = useState<string[]>([]);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
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

      const newPrivateKeys: string[] = [];
      const newPublicKeys: string[] = [];

      for (let i = 0; i < 4; i++) {
        const path = `m/44'/501'/${i}'/0'`;
        const { key: derivedSeed } = derivePath(
          path,
          seedBuffer.toString("hex")
        );
        const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
        const keypair = Keypair.fromSecretKey(secretKey);
        newPrivateKeys.push(Buffer.from(secretKey).toString("hex"));
        newPublicKeys.push(keypair.publicKey.toBase58());
      }

      setPrivateKeys(newPrivateKeys);
      setPublicKeys(newPublicKeys);
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
          <h1 className="tracking-tighter text-5xl font-bold text-primary">
            Kosh
          </h1>
          <span className="text-lg tracking-tighter text-primary/80">
            Your Personal Web3 Wallet.
          </span>
        </div>
        <div className="flex gap-4 mt-6">
          <Input
            type="text"
            placeholder="Enter Your Recovery Phrase (or leave blank to generate)"
            onChange={(e) => setMnemonicInput(e.target.value)}
            value={mnemonicInput}
          />
          <Button onClick={() => handleGenerateWallet()}>
            {mnemonicWords[0] !== " " ? "Regenerate" : "Generate Wallet"}
          </Button>
        </div>
      </motion.div>
      {seed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="group flex flex-col gap-16 cursor-pointer rounded-lg border border-primary/10 p-8 "
        >
          {publicKeys.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="flex gap-2 items-center text-2xl md:text-3xl font-bold tracking-tighter">
                <Key className="size-6" />
                Public Keys
              </h3>
              <div className="flex flex-col gap-2">
                {publicKeys.map((key, index) => (
                  <div
                    onClick={() => copyToClipboard(key)}
                    key={index}
                    className="flex justify-between items-center cursor-pointer transition-all duration-300 text-primary/60 hover:text-primary group"
                  >
                    <p className="truncate">{key}</p>
                    <Copy className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {privateKeys.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <h3 className="flex gap-2 items-center text-2xl md:text-3xl font-bold tracking-tighter">
                  <Lock className="size-6" />
                  Private Keys
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPrivateKeys(!showPrivateKeys)}
                  className="ml-4"
                >
                  {showPrivateKeys ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {privateKeys.map((key, index) => (
                  <div
                    onClick={() => copyToClipboard(key)}
                    key={index}
                    className="flex justify-between items-center cursor-pointer transition-all duration-300 text-primary/60 hover:text-primary group"
                  >
                    <p className="truncate">
                      {showPrivateKeys ? key : "•".repeat(key.length)}
                    </p>
                    <Copy className="size-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          )}
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
          className="group flex flex-col items-center gap-4 cursor-pointer rounded-lg border border-primary/10 p-8 "
        >
          <div className="flex w-full justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
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
              <div className="grid grid-cols-3 gap-8 justify-center w-full items-center mx-auto my-8">
                {mnemonicWords.map((word, index) => (
                  <p key={index} className="font-mono text-primary/80 text-lg">
                    {index + 1}. {word}
                  </p>
                ))}
              </div>
              <div className="text-primary/50 flex w-full gap-2 items-center group-hover:text-primary/80 transition-all duration-300">
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
