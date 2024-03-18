import SendTransactionComponent from "@/components/SendTransactionComponent";

import type { NextPage } from "next";
import dynamic from "next/dynamic";

const MyWallet = dynamic(() => import("@/components/MyWallet"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <MyWallet />
      <SendTransactionComponent />
    </div>
  );
};

export default Home;
