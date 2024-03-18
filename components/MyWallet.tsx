import React from "react";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const MyWallet: React.FC = () => {
  const wallet = useAnchorWallet();
  const walletAddress = wallet?.publicKey.toString();

  return (
    <>
      {(wallet && (
        <p className="text-white">Your wallet is {walletAddress}</p>
      )) || <p className="text-white">Hello! Click the button to connect</p>}

      <div className="text-white">
        <span className="text-white">
          <WalletModalProvider>
            <WalletMultiButton />
          </WalletModalProvider>
        </span>
        {wallet && <WalletDisconnectButton />}
      </div>
    </>
  );
};

export default MyWallet;
