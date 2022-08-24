import * as dfd from "danfojs";
import styled from "styled-components";

import { Area, dataprop } from "../charts/Area";
import { BarPlot } from "../charts/Bar";
import { Metric } from "../charts/Metric";
import { NumberFormatter } from "../utils/Formatters";
import { DepositBy } from "./DepositBy";

type Props = {
  data: dfd.DataFrame;
};
type FlipData = {
  chainname: string;
  date: number;
  tag: string;
  token: string;
  token_vol: number;
  txs: number;
  usd_vol: number;
};

export const BridgeIn = ({ data }: Props) => {
  //   console.log(data);
  let grp = data.groupby(["date"]);
  let usdVOLdf = grp.col(["usd_vol"]).sum();
  let txVOLdf = grp.col(["txs"]).sum();

  usdVOLdf = usdVOLdf.rename({ date: "timestamp", usd_vol_sum: "balance" });
  let usdVOLData = dfd.toJSON(usdVOLdf) as dataprop[];
  txVOLdf = txVOLdf.rename({ date: "timestamp", txs_sum: "balance" });
  let txVOLData = dfd.toJSON(txVOLdf) as dataprop[];

  usdVOLData.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
  let Vol = usdVOLData[usdVOLData.length - 1].balance;
  txVOLData.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });
  let Txs = txVOLData[txVOLData.length - 1].balance;

  let totalVol = data["usd_vol"].sum();
  let totalTxs = data["txs"].sum();

  return (
    <>
      <MetricsDiv>
        <Metric label="USD volume today" value={"$" + NumberFormatter(Vol)} />
        <Metric label="Tx volume today" value={NumberFormatter(Txs)} />
        <Metric label="USD volume overall" value={NumberFormatter(totalVol)} />
        <Metric label="Tx volume overall" value={NumberFormatter(totalTxs)} />
      </MetricsDiv>
      <TvlDiv>
        <Area plotdata={usdVOLData} color={"#5f5ccd"} />
        <BarPlot plotdata={txVOLData} color={"#5f5ccd"} />
      </TvlDiv>
      <br />
      <DepositByDiv>
        <div>
          <p>by Token</p>
          <DepositBy data={data} data_key={"token"} />
        </div>
        <div>
          <p>by destination chain</p>
          <DepositBy data={data} data_key={"chainname"} />
        </div>
        {/* <div>
          <p>by Interface</p>
          <DepositBy data={data} data_key={"tag"} />
        </div> */}
      </DepositByDiv>
    </>
  );
};

const TvlDiv = styled.div`
  padding-top: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;

const MetricsDiv = styled.div`
  padding-top: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
  }

  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
`;

const DepositByDiv = styled.div`
  margin-top: 1 rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
