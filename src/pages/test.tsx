import type { NextPage } from "next";
import Head from "next/head";
import homeStyle from '../styles/Home.module.css'
interface Props {
  chain: string;
}

const Test: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hyphen on Optimism</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* <nav className={homeStyle.navMenu}>
        <a href="#">TVL</a>
        <a href="#">BridgeIn</a>
        <a href="#">BridgeOut</a>
        <a href="#">About</a>
        <div className={homeStyle.dot}></div>
      </nav> */}
    </div>
  );
};

export default Test;
