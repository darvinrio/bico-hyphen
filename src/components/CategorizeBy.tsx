import * as dfd from "danfojs";
import styled from "styled-components";

import { Donut, dataprop } from "../charts/Donut";
import { StackedBar } from "../charts/StackedBar";

type Props = {
  data: dfd.DataFrame;
  data_key: string;
};

export const CategorizeBy = ({ data, data_key }: Props) => {
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
  stackedtxVOLdf = stackedtxVOLdf.rename({
    [data_key]: "key",
    txs_sum: "value",
  });

  return (
    <>
      <p>Txs Vol</p>
      <ByDiv>
        <Donut title={"Overall Tx Vol by " + data_key} plotdata={txVOLData} />
        <StackedBar
          title={"Daily Tx Vol by " + data_key}
          plotdata={stackedtxVOLdf}
        />
      </ByDiv>
      <p>USD Vol</p>
      <ByDiv>
        <Donut title={"Overall USD Vol by " + data_key} plotdata={usdVOLData} />
        <StackedBar
          title={"Daily USD Vol by " + data_key}
          plotdata={stackedusdVOLdf}
        />
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
