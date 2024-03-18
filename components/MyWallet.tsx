import React, { useEffect, useState } from "react";

import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

const XOX_MINT_ADDRESS = "Bw8mAsbLMoFXK3VRg6xpK2Z8q2KdzR29xpcAQKYAUgst";

const MyWallet: React.FC = () => {
  const wallet = useAnchorWallet();
  const walletAddress = wallet?.publicKey.toString();
  const { connection } = useConnection();

  const [balance, setBalance] = useState<number>(0);
  const [balanceXOX, setBalanceXOX] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (wallet?.publicKey) {
          const accountBalance = await connection.getBalance(wallet.publicKey);

          if (accountBalance) {
            setBalance(accountBalance / LAMPORTS_PER_SOL);
          }

          const tokenAccount = getAssociatedTokenAddressSync(
            new PublicKey(XOX_MINT_ADDRESS),
            wallet.publicKey
          );

          const accountUSDCBalance = await connection.getTokenAccountBalance(
            new PublicKey(tokenAccount.toBase58())
          );
          if (accountUSDCBalance) {
            const value = accountUSDCBalance?.value;
            setBalanceXOX(Number(value?.amount) / 10 ** value?.decimals || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <div className="flex-center justify-center gap-4">
      {(wallet?.publicKey && (
        <div>
          <p className="text-white">Your wallet is {walletAddress}</p>
          <p className="text-white">Your wallet balance is {balance}</p>
          <p className="text-white">Your wallet XOX balance is {balanceXOX}</p>
        </div>
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
      </div>
    </div>
  );
};

export default MyWallet;
