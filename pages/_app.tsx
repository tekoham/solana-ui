declare global {}

import React from "react";
import { Provider } from "react-redux";

import store from "@/stores";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "../styles/globals.css";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default MyApp;
