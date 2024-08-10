"use client";
import React, { useState } from "react";
import { createWallet, getPublicKey } from "../utils/walletUtils";

const WalletManager: React.FC = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState<ethers.Wallet[]>([]);

  const handleAddWallet = () => {
    const wallet = createWallet(mnemonic);
    setWallets([...wallets, wallet]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Mnemonic"
        value={mnemonic}
        onChange={(e) => setMnemonic(e.target.value)}
      />
      <button onClick={handleAddWallet}>Add Wallet</button>
      <ul>
        {wallets.map((wallet, index) => (
          <li key={index}>
            Wallet {index + 1}: {getPublicKey(wallet)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletManager;
