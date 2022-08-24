import * as dfd from "danfojs";

import styled from "styled-components";

import { TimeChartMaker } from "../components/TimeChartMaker";
import { MetricMaker } from "../components/MetricMaker";

type Props = {
  data: dfd.DataFrame;
};

export const TotalValueLocked = ({ data }: Props) => {
  let grp = data.groupby(["date"]);

  return (
    <>
      <p>Total Value Locked</p>
      <TvlDiv>
        <TimeChartMaker
          title="Daily Total USD value locked"
          grp={grp}
          key_name={"usd_liq"}
        />
        <MetricMaker
          grp={grp}
          key_name={"usd_liq"}
          prefix={"$"}
          display={"Total USD value locked"}
          large={true}
        />
      </TvlDiv>
    </>
  );
};

const TvlDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1rem;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;
