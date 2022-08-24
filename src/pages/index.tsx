import type { NextPage } from "next";
import * as dfd from "danfojs";

import Head from "next/head";

import { tvlQuery } from "../sql/tvl";
import { queryFlipside } from "../utils/FlipsideQuery";
import { TotalValueLocked } from "../components/TotalValueLocked";
import { TokenValueLocked } from "../components/TokenValueLocked";

export async function getStaticProps() {

  let network = "optimism";
  let liq_pool = "0xb4778f5aefeb4605ed96e893417271d4a55e32ee";
  let weth = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  let usdc = "0x7f5c764cbc14f9669b88837ca1490cca17c31607";
  let usdt = "";
  let bico = "0xd6909e9e702024eb93312b989ee46794c0fb1c9d";

  const data = await queryFlipside(
    tvlQuery({ network, liq_pool, weth, usdc, usdt, bico })
  );

  data?.map((datapoint) => {
    datapoint.date = (new Date(datapoint.date as string)).getTime()
  })

  return {
    props: {data}, // will be passed to the page component as props
    revalidate: 1000
  }
}
interface Props {
  data: JSON[]
}

const Home: NextPage<Props> = ({data}:Props) => {

  let df = new dfd.DataFrame(data);

  return (
    <div>
      <Head>
        <title>Hyphen on Optimism</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <>
      <TotalValueLocked data={df} />
      <TokenValueLocked data={df} /></>
    </div>
  );
};

export default Home;
