import { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import React from "react";
import * as dfd from "danfojs";

import { queryFlipside } from "../../../utils/FlipsideQuery";
import { BridgeOut } from "../../../layouts/BridgeOut";
import { depositQuery } from "../../../sql/deposit";
import { fetchDeployments } from "../../../utils/DeplymentFetch";
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
  const chain = context.params!.name as string;

  let deployments = fetchDeployments(chain.toUpperCase());
  // console.log(deployments);
  let { network, liq_prov, liq_pool, weth, usdc, usdt, bico } = deployments;

  const { data, error } = await queryFlipside(
    depositQuery({ network, liq_pool, weth, usdc, usdt, bico })
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

const Deposit: NextPage<Props> = ({ data, error, network }: Props) => {
  if (error) {
    return (
      <div>
        <h1>Flipside Error</h1>
      </div>
    );
  }

  let df = new dfd.DataFrame(data);
  // console.log(df)

  return (
    <div>
      <Head>
        <title> Bridging from {network} </title>
      </Head>
      <Navbar />
      <BridgeOut data={df} />
    </div>
  );
};

export default Deposit;
