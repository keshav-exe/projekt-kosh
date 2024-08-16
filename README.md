# Projekt Kosh

Kosh (referring to a "vault" in hindi) is a React functional component designed to generate and manage cryptocurrency wallets. It supports both the generation of new wallets and the entry of existing recovery phrases. It displays generated private and public keys, provides functionality to copy them to the clipboard, and includes features for showing or hiding sensitive information.

## Features

- **Generate Wallet**: Create a new wallet and view generated private and public keys.
- **Import Wallet**: Optionally enter an existing recovery phrase to generate keys.
- **Toggle Visibility**: Show or hide private keys and recovery phrases to enhance security.
- **Copy to Clipboard**: Easily copy private keys, public keys, and the recovery phrase.

## Installation

1. Ensure you have Node.js and npm installed on your machine.
2. Clone the repository or add the component to your existing React project.
3. Install the required dependencies.

   ```bash
   npm install tweetnacl bip39 ed25519-hd-key @solana/web3.js sonner lucide-react
   ```

4. Import and use the `WalletGenerator` component in your project.

### State Management

- **`mnemonicWords`**: Stores the words of the recovery phrase.
- **`seed`**: Stores the seed derived from the mnemonic.
- **`privateKeys`**: Stores the generated private keys.
- **`publicKeys`**: Stores the generated public keys.
- **`showMnemonic`**: Boolean state to toggle the visibility of the recovery phrase.
- **`showPrivateKeys`**: Boolean state to toggle the visibility of private keys.

## How It Works

1. **Generating a Wallet**:

   - Generates a new mnemonic phrase and derives the corresponding seed.
   - Uses the seed to generate private and public keys.
   - Displays the generated keys and mnemonic phrase.

2. **Importing a Wallet**:

   - Optionally enter a recovery phrase to derive private and public keys.

3. **Visibility Toggle**:

   - Private keys and recovery phrases can be toggled between visible and censored (asterisks) for security.

4. **Clipboard Copy**:
   - Provides functionality to copy private keys, public keys, and the recovery phrase to the clipboard.

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.
