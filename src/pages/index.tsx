import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { GetStaticPropsContext } from "next";
import { prefetchPages } from "../json/prefetch";
import { fetchDeployments } from "../utils/DeplymentFetch";

// import homeStyle from '../../../styles/Home'

export async function getStaticProps() {
  return { props: {} };
}

interface Props {
  chain: string;
  network: string;
}

const Home = () => {
  let pages = prefetchPages.map((d) => {
    let chain = d.params.name;
    let deployments = fetchDeployments(chain.toUpperCase());

    return <a href={`/chain/${chain}`}>{deployments.network}</a>;
  });

  return (
    <>
      <Head>
        <title>Hyphen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <FullPageNav>
        <h1>{"Hyphen"}</h1>
        {pages}
      </FullPageNav>
    </>
  );
};

export default Home;

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
