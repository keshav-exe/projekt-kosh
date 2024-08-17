import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface WalletFormProps {
  mnemonicInput: string;
  setMnemonicInput: (value: string) => void;
  pathTypes: string[];
  setPathTypes: (value: string[]) => void;
  handleGenerateWallet: () => void;
}

const WalletForm: React.FC<WalletFormProps> = ({
  mnemonicInput,
  setMnemonicInput,
  pathTypes,
  setPathTypes,
  handleGenerateWallet,
}) => {
  if (pathTypes.length === 0) {
    return (
      <div className="flex gap-4 flex-col md:flex-row">
        <h2 className="tracking-tighter text-3xl md:text-4xl font-extrabold">
          Wallet type
        </h2>
        <div className="flex flex-col gap-4 w-full md:w-96">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg">Choose a wallet type:</h3>
            <select
              className="p-2 border border-gray-300 rounded"
              onChange={(e) => setPathTypes([e.target.value])}
            >
              <option value="501">Solana</option>
              <option value="60">Ethereum</option>
              <option value="0">Bitcoin</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="flex flex-col gap-4 w-full md:w-96">
        <h3 className="text-lg">Enter mnemonic phrase:</h3>
        <Input
          value={mnemonicInput}
          onChange={(e) => setMnemonicInput(e.target.value)}
          placeholder="Enter mnemonic phrase"
        />
        <Button
          onClick={handleGenerateWallet}
          className="bg-primary text-white hover:bg-primary-dark"
        >
          Generate Wallet
        </Button>
      </div>
    </div>
  );
};

export default WalletForm;
