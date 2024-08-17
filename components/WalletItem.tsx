import React from "react";
import { Button } from "./ui/button";

interface WalletItemProps {
  wallet: Wallet;
  pathTypeName: string;
  visiblePrivateKey: boolean;
  visiblePhrase: boolean;
  togglePrivateKeyVisibility: () => void;
  togglePhraseVisibility: () => void;
  copyToClipboard: (content: string) => void;
  handleDeleteWallet: () => void;
}

const WalletItem: React.FC<WalletItemProps> = ({
  wallet,
  pathTypeName,
  visiblePrivateKey,
  visiblePhrase,
  togglePrivateKeyVisibility,
  togglePhraseVisibility,
  copyToClipboard,
  handleDeleteWallet,
}) => {
  return (
    <div className="flex flex-col p-4 border border-gray-300 rounded">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold">{pathTypeName}</span>
        <span className="text-gray-600">Public Key: {wallet.publicKey}</span>
        <span className="text-gray-600">
          {visiblePrivateKey
            ? `Private Key: ${wallet.privateKey}`
            : "Private Key: Hidden"}
        </span>
        <Button onClick={togglePrivateKeyVisibility}>
          {visiblePrivateKey ? "Hide Private Key" : "Show Private Key"}
        </Button>
        <Button onClick={togglePhraseVisibility}>
          {visiblePhrase ? "Hide Mnemonic" : "Show Mnemonic"}
        </Button>
        <Button onClick={() => copyToClipboard(wallet.publicKey)}>
          Copy Public Key
        </Button>
        <Button onClick={() => copyToClipboard(wallet.privateKey)}>
          Copy Private Key
        </Button>
        <Button
          onClick={handleDeleteWallet}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Delete Wallet
        </Button>
      </div>
    </div>
  );
};

export default WalletItem;
