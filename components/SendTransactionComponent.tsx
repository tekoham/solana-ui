import React, { useCallback, useEffect, useState } from "react";

import { commitmentLevel } from "@/constant/common";
import { AnchorProvider, BN, Program, web3 } from "@project-serum/anchor";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import XOXPreSaleIDL from "idl/presaleIDL.json";

const presaleIdlAddress = "Bw8mAsbLMoFXK3VRg6xpK2Z8q2KdzR29xpcAQKYAUgst";

const SendTransactionComponent: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const presaleIdl = XOXPreSaleIDL;
  const XOXPresaleProgramId = new PublicKey(presaleIdlAddress);
  const XOXPresaleProgramInterface = JSON.parse(JSON.stringify(presaleIdl));

  const [pendingXOX, setPendingXOX] = useState(0);

  const onClick = useCallback(async () => {
    if (!wallet?.publicKey) throw new WalletNotConnectedError();

    try {
      const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: commitmentLevel,
      });

      const program = new Program(
        XOXPresaleProgramInterface,
        XOXPresaleProgramId,
        provider
      );

      const [Storage_Address] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("XOX"), wallet.publicKey.toBuffer()],
        program.programId
      );

      /* interact with the program via rpc */
      const txn = await program.methods
        .deposit(new BN(1000000))
        .accounts({
          from: wallet.publicKey,
          to: new PublicKey("HE9vAZ3FeNihBBdEfjZmogFiW9RMYzPMfQehJ66UCgfV"),
          systemProgram: web3.SystemProgram.programId,
          data: Storage_Address,
        })
        .signers([])
        .transaction();

      const latestBlockHash = await connection.getLatestBlockhash();
      txn.feePayer = wallet.publicKey;
      txn.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const signedTx = await wallet.signTransaction(txn);
      const txId = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txId,
      });
    } catch (err) {
      console.error("Transaction error: ", err);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, connection, XOXPresaleProgramId]);

  useEffect(() => {
    const fetchPendingXOX = async () => {
      if (wallet?.publicKey) {
        const provider = new AnchorProvider(connection, wallet, {
          preflightCommitment: commitmentLevel,
        });

        const program = new Program(
          XOXPresaleProgramInterface,
          XOXPresaleProgramId,
          provider
        );

        const [Storage_Address] = web3.PublicKey.findProgramAddressSync(
          [Buffer.from("XOX"), wallet.publicKey.toBuffer()],
          program.programId
        );

        try {
          const data = await program.account.programStorage.fetch(
            Storage_Address
          );
          // Update later when has data on contract
          setPendingXOX(Number(data));
        } catch (err) {
          console.error("Fetch error: ", err);
          return;
        }
      }
    };

    fetchPendingXOX();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <>
      {wallet?.publicKey && (
        <div>
          <button
            onClick={onClick}
            disabled={!wallet?.publicKey}
            className="p-4 bg-white text-black rounded-lg font-bold hover:opacity-80"
          >
            Deposit to presale contract
          </button>
          <p className="text-white mt-4 text-center">
            Pending XOX: {pendingXOX}
          </p>
        </div>
      )}
    </>
  );
};

export default SendTransactionComponent;
