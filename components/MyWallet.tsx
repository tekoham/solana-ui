import React from "react";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

const MyWallet: React.FC = () => {
  const wallet = useAnchorWallet();
  const walletAddress = wallet?.publicKey.toString();

  return (
    <div className="h-[100vh] w-[100%] flex-center justify-center gap-4">
      {(wallet && (
        <p className="text-white">Your wallet is {walletAddress}</p>
      )) || (
        <p className="text-white text-xl font-bold">
          Hello! Click the button to connect
        </p>
      )}

      <div className="text-white">
        <span className="text-white">
          <WalletModalProvider>
            <WalletMultiButton />
          </WalletModalProvider>
        </span>
        {wallet && <WalletDisconnectButton />}
      </div>
    </div>
  );
};

export default MyWallet;
