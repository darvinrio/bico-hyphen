import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { fetchDeployments } from "../../../utils/DeplymentFetch";
import { GetStaticPropsContext } from "next";
import { prefetchPages } from "../../../json/prefetch";

// import homeStyle from '../../../styles/Home'

export async function getStaticPaths() {
  return {
    paths: prefetchPages,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const chain = context.params!.name as string;
  let deployments = fetchDeployments(chain.toUpperCase());

  return {
    props: {
      chain: chain,
      network: deployments.network,
    },
  };
}

interface Props {
  chain: string;
  network: string;
}

const Chain = ({ chain, network }: Props) => {
  // let deployments = fetchDeployments(chain.toUpperCase())

  return (
    <>
      <Head>
        <title>Hyphen on {network}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <FullPageNav>
        <h1>{network}</h1>
        <a href={`/chain/${chain}/tvl`}>TVL</a>
        <a href={`/chain/${chain}/withdraw`}>BridgeIn</a>
        <a href={`/chain/${chain}/deposit`}>BridgeOut</a>
        {/* <a href="#">About</a> */}
      </FullPageNav>
    </>
  );
};

export default Chain;

const FullPageNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;

  flex-direction: column;
  gap: 30px;
  /* justify-content: space-evenly; */
  justify-content: center;
  align-items: center;

  font-size: 30px;
`;
