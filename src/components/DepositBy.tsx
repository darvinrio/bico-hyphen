import * as dfd from "danfojs";
import styled from "styled-components";

import { Donut, dataprop } from "../charts/Donut";

type Props = {
  data: dfd.DataFrame;
  data_key: string;
};

export const DepositBy = ({ data, data_key }: Props) => {
  // console.log(data_key);
  let grp = data.groupby([data_key]);
  let txVOLdf = grp.col(["txs"]).sum();
  let usdVOLdf = grp.col(["usd_vol"]).sum();

  usdVOLdf = usdVOLdf.rename({ [data_key]: "key", usd_vol_sum: "value" });
  let usdVOLData = dfd.toJSON(usdVOLdf) as dataprop[];
  txVOLdf = txVOLdf.rename({ [data_key]: "key", txs_sum: "value" });
  let txVOLData = dfd.toJSON(txVOLdf) as dataprop[];

  return (
    <ByDiv>
      <Donut plotdata={usdVOLData} />
      <Donut plotdata={txVOLData} />
    </ByDiv>
  );
};

const ByDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;
