import { useEffect, useState } from "react";
import * as dfd from "danfojs";

import styled from "styled-components";

import { Area, dataprop } from "../charts/Area";
import { NumberFormatter } from "../utils/Formatters";
import { Metric } from "../charts/Metric";

type Props = {
  data: dfd.DataFrame;
};

export const TokenValueLocked = ({ data }: Props) => {
  let tokens = data["token"].unique().values;

  let tokensDiv = tokens.map((token: string) => {
    let plotdf = data.query(data["token"].eq(token));

    plotdf = plotdf.rename({ date: "timestamp", usd_liq: "balance" });
    let plotData = dfd.toJSON(plotdf) as dataprop[];

    plotData.sort((a, b) => {
        return a.timestamp - b.timestamp;
      })
      let TVL = plotData[plotData.length-1].balance

      return (
        <>
          <p>Total Value Locked in {token} pools</p>
          <TvlDiv>
            <Area plotdata={plotData} />
            <Metric label={`Total USD value locked in ${token} pools`} value={NumberFormatter(TVL)} />
          </TvlDiv>
        </>
      );
  });

 
  return (
    <>
      {tokensDiv}
    </>
  );
};

const TvlDiv = styled.div`
  /* max-height: 400px ; */
  min-height: 300px;
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
