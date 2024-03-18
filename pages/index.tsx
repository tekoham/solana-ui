import SendTransactionComponent from "@/components/SendTransactionComponent";

import type { NextPage } from "next";
import dynamic from "next/dynamic";

const MyWallet = dynamic(() => import("@/components/MyWallet"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className="flex-center justify-center flex-col gap-10 h-[100vh] w-[100%]">
      <MyWallet />
      <SendTransactionComponent />
    </div>
  );
};

export default Home;
