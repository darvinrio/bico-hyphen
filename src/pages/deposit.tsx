import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import * as dfd from "danfojs";

import { BridgeOut } from "../layouts/BridgeOut";
import { depositQuery } from "../sql/deposit";

import { queryFlipside } from "../utils/FlipsideQuery";

export async function getStaticProps() {
  let network = "optimism";
  let liq_pool = "0x856cb5c3cbbe9e2e21293a644aa1f9363cee11e8";
  let weth = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  let usdc = "0x7f5c764cbc14f9669b88837ca1490cca17c31607";
  let usdt = "";
  let bico = "0xd6909e9e702024eb93312b989ee46794c0fb1c9d";

  const data = await queryFlipside(
    depositQuery({ network, liq_pool, weth, usdc, usdt, bico })
  );

  data?.map((datapoint) => {
    datapoint.date = new Date(datapoint.date as string).getTime();
  });

  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 1000,
  };
}

interface Props {
  data: JSON[];
}

const Deposit: NextPage<Props> = ({ data }: Props) => {
  let df = new dfd.DataFrame(data);

  return (
    <div>
      <Head>
        <title> Bridging from Optimism </title>
      </Head>
      <BridgeOut df={df} />
    </div>
  );
};

export default Deposit;
