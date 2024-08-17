"use client";
import React from "react";
import { Button } from "./ui/button";
import { EyeOff, Eye, Trash, Grid2X2, List } from "lucide-react";
import { motion } from "framer-motion";
import bs58 from "bs58";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";

interface WalletListProps {
  wallets: any;
  pathTypeName: string;
  gridView: boolean;
  setGridView: (value: boolean) => void;
  handleGenerateWallet: () => void;
  handleClearWallets: () => void;
  handleDeleteWallet: (index: number) => void;
  togglePrivateKeyVisibility: (index: number) => void;
  visiblePrivateKeys: boolean[];
  visiblePhrases: boolean[];
  togglePhraseVisibility: (index: number) => void;
  copyToClipboard: (content: string) => void;
}

const WalletList = ({
  wallets,
  pathTypeName,
  gridView,
  setGridView,
  handleGenerateWallet,
  handleClearWallets,
  handleDeleteWallet,
  togglePrivateKeyVisibility,
  togglePhraseVisibility,
  visiblePrivateKeys,
  visiblePhrases,
  copyToClipboard,
}: WalletListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="flex flex-col gap-8 mt-6"
    >
      <div className="flex md:flex-row justify-between w-full gap-4 items-center">
        <h2 className="tracking-tighter text-3xl md:text-4xl font-extrabold">
          {pathTypeName} Vault
        </h2>
        <div className="flex gap-2">
          {wallets.length > 1 && (
            <Button
              variant={"ghost"}
              onClick={() => setGridView(!gridView)}
              className="hidden md:block"
            >
              {gridView ? <Grid2X2 /> : <List />}
            </Button>
          )}
          <Button onClick={() => handleGenerateWallet()}>Add Wallet</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="self-end">
                Clear Wallets
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete all wallets?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your wallets and keys from local storage.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleClearWallets()}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div
        className={`grid gap-6 grid-cols-1 col-span-1  ${
          gridView ? "md:grid-cols-2 lg:grid-cols-3" : ""
        }`}
      >
        {wallets.map((wallet: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + index * 0.1,
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="flex flex-col rounded-2xl border border-primary/10"
          >
            <div className="flex justify-between px-8 py-6">
              <h3 className="font-bold text-2xl md:text-3xl tracking-tighter ">
                Wallet {index + 1}
              </h3>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="flex gap-2 items-center">
                    <Trash className="size-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete all wallets?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your wallets and keys from local storage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteWallet(index)}
                      className="text-destructive"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="flex flex-col gap-8 px-8 py-4 rounded-2xl bg-secondary/50">
              <div
                className="flex flex-col w-full gap-2"
                onClick={() => copyToClipboard(wallet.publicKey)}
              >
                <span className="text-lg md:text-xl font-bold tracking-tighter">
                  Public Key
                </span>
                <p className="text-primary/80 font-medium cursor-pointer hover:text-primary transition-all duration-300 truncate">
                  {wallet.publicKey}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-lg md:text-xl font-bold tracking-tighter">
                  Private Key
                </span>
                <div className="flex justify-between w-full items-center gap-2">
                  <p
                    onClick={() => copyToClipboard(wallet.privateKey)}
                    className="text-primary/80 font-medium cursor-pointer hover:text-primary transition-all duration-300 truncate"
                  >
                    {visiblePrivateKeys[index]
                      ? wallet.privateKey
                      : "•".repeat(wallet.mnemonic.length)}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => togglePrivateKeyVisibility(index)}
                  >
                    {visiblePrivateKeys[index] ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-lg md:text-xl font-bold tracking-tighter">
                  Secret Phrase
                </span>
                <div className="flex justify-between w-full items-center gap-2">
                  <p
                    onClick={() => copyToClipboard(wallet.mnemonic)}
                    className="text-primary/80 font-medium cursor-pointer hover:text-primary transition-all duration-300 truncate"
                  >
                    {visiblePhrases[index]
                      ? wallet.mnemonic
                      : "•".repeat(wallet.mnemonic.length)}
                  </p>

                  <Button
                    variant="ghost"
                    onClick={() => togglePhraseVisibility(index)}
                  >
                    {visiblePhrases[index] ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WalletList;
