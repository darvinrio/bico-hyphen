import * as dfd from "danfojs";
import styled from "styled-components";

import { Donut, dataprop } from "../charts/Donut";
import { StackedBar, stackeddataprop } from "../charts/StackedBar";

type Props = {
  data: dfd.DataFrame;
  data_key: string;
};

export const DepositBy = ({ data, data_key }: Props) => {
  // console.log(data_key);
  // Donut making
  let grp = data.groupby([data_key]);
  let txVOLdf = grp.col(["txs"]).sum();
  let usdVOLdf = grp.col(["usd_vol"]).sum();

  usdVOLdf = usdVOLdf.rename({ [data_key]: "key", usd_vol_sum: "value" });
  let usdVOLData = dfd.toJSON(usdVOLdf) as dataprop[];
  txVOLdf = txVOLdf.rename({ [data_key]: "key", txs_sum: "value" });
  let txVOLData = dfd.toJSON(txVOLdf) as dataprop[];

  //Stacked Bar making
  let stacked_grp = data.groupby(["date", data_key]);
  let stackedtxVOLdf = stacked_grp.col(["txs"]).sum();
  let stackedusdVOLdf = stacked_grp.col(["usd_vol"]).sum();

  stackedusdVOLdf = stackedusdVOLdf.rename({
    [data_key]: "key",
    usd_vol_sum: "value",
  });
  let stackedusdVOLData = dfd.toJSON(stackedusdVOLdf) as stackeddataprop[];
  stackedtxVOLdf = stackedtxVOLdf.rename({
    [data_key]: "key",
    txs_sum: "value",
  });
  let stackedtxVOLData = dfd.toJSON(stackedtxVOLdf) as stackeddataprop[];

  return (
    <>
      <p>Txs Vol</p>
      <ByDiv>
        <Donut plotdata={txVOLData} />
        <StackedBar plotdata={stackedtxVOLdf} />
      </ByDiv>
      <p>USD Vol</p>
      <ByDiv>
        <Donut plotdata={usdVOLData} />
        <StackedBar plotdata={stackedusdVOLdf} />
      </ByDiv>
      <br />
      <hr />
    </>
  );
};

const ByDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;

  @media (max-width: 1200px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`;
