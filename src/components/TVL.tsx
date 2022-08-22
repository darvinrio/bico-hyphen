import { useEffect, useState } from "react";
import { tvlQuery } from "../sql/tvl";
import { queryFlipside } from "../utils/FlipsideQuery";
import { QueryResultRecord } from "@flipsidecrypto/sdk";
import { Area } from "../charts/Area";

export const TVL = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<JSX.Element | null>(null);

  let network = "optimism";
  let liq_pool = "0xb4778f5aefeb4605ed96e893417271d4a55e32ee";
  let weth = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  let usdc = "0x7f5c764cbc14f9669b88837ca1490cca17c31607";
  let usdt = "";
  let bico = "0xd6909e9e702024eb93312b989ee46794c0fb1c9d";

  useEffect(() => {
    const getData = async () => {
      const Data = await queryFlipside(
        tvlQuery({ network, liq_pool, weth, usdc, usdt, bico })
      );
      setLoading(false);
      console.log(Data);
      let plotData = Data?.map((datapoint) => {
        return {
          timestamp: new Date(datapoint.date).getTime(),
          balance: datapoint.tvl,
        };
      });
      console.log(plotData);
      setChartData(<Area plotdata={plotData} />);
    };

    getData();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <>
      <div>TVL</div>
      {chartData}
    </>
  );
};
