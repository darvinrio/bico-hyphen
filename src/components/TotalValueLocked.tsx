import { useEffect, useState } from "react";
import * as dfd from "danfojs";

import styled from "styled-components";

import { Area, dataprop } from "../charts/Area";
import { NumberFormatter } from "../utils/Formatters";
import { Metric } from "../charts/Metric";

type Props = {
  data: dfd.DataFrame;
};

export const TotalValueLocked = ({ data }: Props) => {

  let grp = data.groupby(["date"]);
  let plotdf = grp.col(["usd_liq"]).sum();
  plotdf = plotdf.rename({ date: "timestamp", usd_liq_sum: "balance" });

  let plotData = dfd.toJSON(plotdf) as dataprop[];
  // console.log(plotData);

  plotData.sort((a, b) => {
    return a.timestamp - b.timestamp;
  })
  let TVL = plotData[plotData.length-1].balance

  return (
    <>
      <p>Total Value Locked</p>
      <TvlDiv>
        <Area plotdata={plotData} />
        <Metric label="Total USD value locked" value={NumberFormatter(TVL)} />
      </TvlDiv>
    </>
  );
};

const TvlDiv = styled.div`
  /* max-height: 400px ; */
  min-height: 300px;
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
