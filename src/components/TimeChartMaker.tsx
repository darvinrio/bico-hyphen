import * as dfd from "danfojs";
import Groupby from "danfojs/dist/danfojs-base/aggregators/groupby";
import React from "react";
import { Area } from "../charts/Area";
import { BarPlot } from "../charts/Bar";

interface dataprop {
  timestamp: number;
  balance: number;
}

interface Props {
  grp: Groupby;
  key_name: string;
  chart?: string;
  title: string;
  // display: string;
}

export const TimeChartMaker = ({
  grp,
  key_name,
  title,
  chart = "Area",
}: Props) => {
  let VOLdf = grp.col([key_name]).sum();

  VOLdf = VOLdf.rename({ date: "timestamp", [key_name + "_sum"]: "balance" });
  let VOLData = dfd.toJSON(VOLdf) as dataprop[];

  switch (chart) {
    case "Bar":
      return <BarPlot title={title} plotdata={VOLData} color={"#5f5ccd"} />;
    default:
      return <Area title={title} plotdata={VOLData} color={"#5f5ccd"} />;
  }
};
