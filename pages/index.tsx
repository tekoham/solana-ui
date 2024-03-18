import MyWallet from "@/components/MyWallet";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <MyWallet />
    </div>
  );
};

export default Home;
