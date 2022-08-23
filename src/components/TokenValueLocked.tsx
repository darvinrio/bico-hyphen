import { useEffect, useState } from "react";
import * as dfd from "danfojs";

import styled from "styled-components";

import { Area, dataprop } from "../charts/Area";
import { NumberFormatter } from "../utils/Formatters";
import { Metric } from "../charts/Metric";
let tokenJSON = require("./../json/tokens.json");

type Props = {
  data: dfd.DataFrame;
};

type FlipData = {
  date: number;
  token: string;
  liq: number;
  usd_liq: number;
  price: number;
  rank: number;
};

export const TokenValueLocked = ({ data }: Props) => {
  let tokens = data["token"].unique().values;

  let tokensDiv = tokens.map((token: string) => {
    let plotdf = data.query(data["token"].eq(token));

    let plotUSDdf = plotdf.rename({ date: "timestamp", usd_liq: "balance" });
    let plotUSDdata = dfd.toJSON(plotUSDdf) as dataprop[];

    let plotTokendf = plotdf.rename({ date: "timestamp", liq: "balance" });
    let plotTokendata = dfd.toJSON(plotTokendf) as dataprop[];

    let tokenInfo = dfd.toJSON(plotdf) as FlipData[];

    return (
      <InfoDiv>
        <p>Total Value Locked in {token} pools</p>
        <TvlDiv>
          <ChartDiv>
            <Area plotdata={plotUSDdata} color={tokenJSON[token].color} />
          </ChartDiv>
          <ChartDiv>
            <Area plotdata={plotTokendata} color={tokenJSON[token].color} />
          </ChartDiv>
          <MetricsDiv>
            <Metric
              label={`USD value locked`}
              value={NumberFormatter(tokenInfo[0].usd_liq)}
            />
            <Metric
              label={`Tokens locked`}
              value={NumberFormatter(tokenInfo[0].liq)}
            />
            <Metric
              label={`Current price`}
              value={NumberFormatter(tokenInfo[0].price) + "$"}
            />
            <Metric
              label={`Total USD value locked in ${token} pools`}
              value={NumberFormatter(0)}
            />
          </MetricsDiv>
        </TvlDiv>
      </InfoDiv>
    );
  });

  return <>{tokensDiv}</>;
};
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChartDiv = styled.div`
  max-height: 400px;
`;

const TvlDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

const MetricsDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
`;
