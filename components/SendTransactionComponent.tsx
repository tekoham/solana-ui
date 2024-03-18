import React, { useCallback } from "react";

import { commitmentLevel } from "@/constant/common";
import { AnchorProvider, Program, web3 } from "@project-serum/anchor";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import BigNumber from "bignumber.js";
import XOXPreSaleIDL from "idl/presaleIDL.json";

const presaleIdlAddress = "Bw8mAsbLMoFXK3VRg6xpK2Z8q2KdzR29xpcAQKYAUgst";

const SendTransactionComponent: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const presaleIdl = XOXPreSaleIDL;
  const XOXPresaleProgramId = new PublicKey(presaleIdlAddress);
  const XOXPresaleProgramInterface = JSON.parse(JSON.stringify(presaleIdl));

  const onClick = useCallback(async () => {
    if (!wallet?.publicKey) throw new WalletNotConnectedError();

    const provider = new AnchorProvider(connection, wallet, {
      preflightCommitment: commitmentLevel,
    });

    const program = new Program(
      XOXPresaleProgramInterface,
      XOXPresaleProgramId,
      provider
    );

    try {
      /* interact with the program via rpc */
      const signer = web3.Keypair.generate();

      const txn = await program.methods
        .deposit(new BigNumber(1000000))
        .accounts({
          message: wallet.publicKey,
          author: provider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([signer])
        .rpc();

      // eslint-disable-next-line no-console
      console.log("Transaction Data: ", txn);
    } catch (err) {
      console.error("Transaction error: ", err);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, connection, XOXPresaleProgramId]);

  return (
    <>
      {wallet?.publicKey && (
        <button
          onClick={onClick}
          disabled={!wallet?.publicKey}
          className="p-4 bg-white text-black rounded-lg font-bold hover:opacity-80"
        >
          Deposit to presale contract
        </button>
      )}
    </>
  );
};

export default SendTransactionComponent;
