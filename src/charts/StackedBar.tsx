import * as dfd from "danfojs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

import { dateFormatter } from "../utils/PlotHelpers";
import { NumberFormatter } from "../utils/Formatters";

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export interface stackeddataprop {
  key: string;
  timestamp: number;
  balance: number;
}

interface props {
  //   plotdata: stackeddataprop[];
  plotdata: dfd.DataFrame;
}

export const StackedBar = ({ plotdata }: props) => {
  plotdata.sortValues("date", { inplace: true });
  plotdata.resetIndex({ inplace: true });
  //   console.log(plotdata);

  let keys = plotdata["key"].unique().values;
  let dates = plotdata["date"].unique().values;
  // dates = dates.map((date:number) => {
  //     return dateFormatter(date)
  // })

  const alpha = 0.5;
  let bgcolor = [
    `rgba(255, 99, 132, ${alpha})`,
    `rgba(54, 162, 235, ${alpha})`,
    `rgba(255, 206, 86, ${alpha})`,
    `rgba(75, 192, 192, ${alpha})`,
    `rgba(153, 102, 255, ${alpha})`,
    `rgba(255, 159, 64, ${alpha})`,
  ];
  let i = 0;
  let datasets = keys.map((key: string) => {
    let keydf = plotdata.query(plotdata["key"].eq(key));

    return {
      label: key,
      data: keydf["value"].values,
      backgroundColor: bgcolor[i++],
    };
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as "index",
    },
    plugins: {
      title: {
        display: false,
        // text: "Chart.js Bar Chart - Stacked",
      },
    },
    scales: {
      x: {
        stacked: true,
        type: "time",
        time: {
          unit: "week",
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  const data = {
    labels: dates,
    datasets: datasets,
  };

  return (
    <ChartWrap>
      <ChartDiv>
        <Bar options={options} data={data} />
      </ChartDiv>
    </ChartWrap>
  );
};

const ChartDiv = styled.div`
  padding: 1rem;
  min-height: 300px;
  position: relative;
`;

const ChartWrap = styled.div`
  min-width: 0;

  border: 1px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
`;