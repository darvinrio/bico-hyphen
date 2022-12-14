import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";
import * as dfd from "danfojs";

import { fetchDeployments } from "../../../utils/DeplymentFetch";
import { queryFlipside } from "../../../utils/FlipsideQuery";
import { withdrawQuery } from "../../../sql/withdraw";
import { BridgeIn } from "../../../layouts/BridgeIn";
import { prefetchPages } from "../../../json/prefetch";
import { useRouter } from "next/router";
import { Navbar } from "../../../layouts/Navbar";

export async function getStaticPaths() {
  return {
    paths: prefetchPages,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const chain = (context.params!.name as string).toUpperCase();

  let deployments = fetchDeployments(chain);
  // console.log(deployments);
  let { network, liq_prov, liq_pool, weth, usdc, usdt, bico } = deployments;

  const { data, error } = await queryFlipside(
    withdrawQuery({ network, liq_pool, weth, usdc, usdt, bico })
  );

  data?.map((datapoint) => {
    datapoint.date = new Date(datapoint.date as string).getTime();
  });

  return {
    props: {
      data: data,
      error: error,
      network: network,
    }, // will be passed to the page component as props
    revalidate: 1000,
  };
}

interface Props {
  data: JSON[];
  error: boolean;
  network:string,
}

const Withdraw: NextPage<Props> = ({ data, error, network }: Props) => {
  if (error) {
    return (
      <div>
        <h1>Flipside Error</h1>
      </div>
    );
  }

  let df = new dfd.DataFrame(data);
  // console.log(df);

  return (
    <div>
      <Head>
        <title> Bridging to {network} </title>
      </Head>
      <Navbar />
      <BridgeIn data={df} />
    </div>
  );
};

export default Withdraw;
