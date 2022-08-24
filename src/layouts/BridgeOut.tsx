import * as dfd from "danfojs";
import styled from "styled-components";

import { CategorizeBy } from "../components/CategorizeBy";
import { MetricMaker } from "../components/MetricMaker";
import { TimeChartMaker } from "../components/TimeChartMaker";

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

export const BridgeOut = ({ data }: Props) => {
  //   console.log(data);
  let grp = data.groupby(["date"]);

  return (
    <>
      <MetricsDiv>
        <MetricMaker
          grp={grp}
          key_name={"usd_vol"}
          prefix={"$"}
          display={"USD"}
          currentOnly={false}
        />
        <MetricMaker
          grp={grp}
          key_name={"txs"}
          display={"Tx"}
          currentOnly={false}
        />
      </MetricsDiv>
      <TvlDiv>
        <TimeChartMaker
          title="Daily USD volume Bridged Out"
          grp={grp}
          key_name={"usd_vol"}
        />
        <TimeChartMaker
          title="Daily Bridge Out transactions"
          grp={grp}
          key_name={"txs"}
          chart={"Bar"}
        />
      </TvlDiv>
      <br />
      <CategorizeByDiv>
        <div>
          <p>by Token</p>
          <CategorizeBy data={data} data_key={"token"} />
        </div>
        <div>
          <p>by destination chain</p>
          <CategorizeBy data={data} data_key={"chainname"} />
        </div>
        <div>
          <p>by Interface</p>
          <CategorizeBy data={data} data_key={"tag"} />
        </div>
      </CategorizeByDiv>
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

const CategorizeByDiv = styled.div`
  margin-top: 1 rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
