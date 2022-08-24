import * as dfd from "danfojs";
import Groupby from "danfojs/dist/danfojs-base/aggregators/groupby";
import React from "react";
import { Metric } from "../charts/Metric";
import { NumberFormatter } from "../utils/Formatters";

interface dataprop {
  timestamp: number;
  balance: number;
}

interface Props {
  grp: Groupby;
  key_name: string;
  prefix?: string;
  display: string;
  currentOnly?: boolean;
  large?:boolean
}

export const MetricMaker = ({
  grp,
  key_name,
  display,
  prefix = "",
  currentOnly = true,
  large = false
}: Props) => {
  let VOLdf = grp.col([key_name]).sum();

  VOLdf = VOLdf.rename({ date: "timestamp", [key_name + "_sum"]: "balance" });
  let VOLData = dfd.toJSON(VOLdf) as dataprop[];

  VOLData.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
  let Vol = VOLData[VOLData.length - 1].balance;
  let totalVol = VOLdf["balance"].sum();

  if (currentOnly) {
    return (
      <>
        <Metric
          label={display}
          value={prefix + NumberFormatter(Vol)}
          large={large}
        />
      </>
    );
  }
  return (
    <>
      <Metric
        label={display + " volume today"}
        value={prefix + NumberFormatter(Vol)}
      />
      <Metric
        label={display + " volume overall"}
        value={prefix + NumberFormatter(totalVol)}
      />
    </>
  );
};
