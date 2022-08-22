import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { TVL } from "../components/TVL";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hyphen on Optimism</title>
        <meta />
      </Head>
      Hey there
      <TVL />
    </div>
  );
};

export default Home;
