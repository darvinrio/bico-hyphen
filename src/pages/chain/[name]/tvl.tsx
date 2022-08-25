import type { GetStaticPropsContext, NextPage } from "next";
import * as dfd from "danfojs";

import Head from "next/head";
import { queryFlipside } from "../../../utils/FlipsideQuery";
import { tvlQuery } from "../../../sql/tvl";
import { TotalValueLocked } from "../../../layouts/TotalValueLocked";
import { TokenValueLocked } from "../../../layouts/TokenValueLocked";
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
  const chain = (context.params!.name as string).toUpperCase();

  let deployments = fetchDeployments(chain);
  let { network, liq_prov, liq_pool, weth, usdc, usdt, bico } = deployments;

  const { data, error } = await queryFlipside(
    tvlQuery({ network, liq_prov, weth, usdc, usdt, bico })
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

const Home: NextPage<Props> = ({ data, error, network }: Props) => {
  if (error) {
    return (
      <div>
        <h1>Flipside Error</h1>
      </div>
    );
  }

  let df = new dfd.DataFrame(data);

  return (
    <div>
      <Head>
        <title>TVL on {network}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <>
        <TotalValueLocked data={df} />
        <TokenValueLocked data={df} />
      </>
    </div>
  );
};

export default Home;
