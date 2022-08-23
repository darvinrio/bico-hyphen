import { useEffect, useState } from "react";
import * as dfd from "danfojs";

import { TotalValueLocked } from "../components/TotalValueLocked";
import { tvlQuery } from "../sql/tvl";
import { queryFlipside } from "../utils/FlipsideQuery";
import { TokenValueLocked } from "../components/TokenValueLocked";

interface Props {
  df: dfd.DataFrame
}

export const ValueLocked = ({df}:Props) => {

  // const [loading, setLoading] = useState(true);
  // const [Data, setData] = useState<dfd.DataFrame>(new dfd.DataFrame([{}]));

  // let network = "optimism";
  // let liq_pool = "0xb4778f5aefeb4605ed96e893417271d4a55e32ee";
  // let weth = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  // let usdc = "0x7f5c764cbc14f9669b88837ca1490cca17c31607";
  // let usdt = "";
  // let bico = "0xd6909e9e702024eb93312b989ee46794c0fb1c9d";

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await queryFlipside(
  //       tvlQuery({ network, liq_pool, weth, usdc, usdt, bico })
  //     );
  //     setLoading(false);
  //     // console.log(data);

  //     data?.map((datapoint) => {
  //       datapoint.date = (new Date(datapoint.date as string)).getTime()
  //     })

  //     let df = new dfd.DataFrame(data);
  //     setData(df);
  //     // console.log(Data)
  //   };

  //   getData();
  // }, []);

  // if (loading) {
  //   return <div>loading</div>;
  // }
  return (
    <>
      <TotalValueLocked data={df} />
      <TokenValueLocked data={df} />
    </>
  );
};
