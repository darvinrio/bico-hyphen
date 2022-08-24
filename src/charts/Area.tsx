import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

import { NumberFormatter } from "../utils/Formatters";
import { Card } from "../layouts/Card";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export interface dataprop {
  timestamp: number;
  balance: number;
}
type hexcolor = `#${string}`;

interface props {
  plotdata: dataprop[];
  color: hexcolor;
  title:string
}

export const Area = ({ plotdata, color, title }: props) => {
  plotdata.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  const timestamps = plotdata.map((data) => {
    // return dateFormatter(data.timestamp);
    return data.timestamp;
  });
  const balances = plotdata.map((data) => {
    return data.balance;
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "week",
        },
      },
      y: {
        ticks: {
          callback: function (value: number, index: number) {
            return NumberFormatter(value);
          },
        },
      },
    },
  };

  const data = {
    labels: timestamps,
    datasets: [
      {
        data: balances,
        fill: true,
        stepped: true,
        backgroundColor: color + "46",
        borderWidth: 1,
        borderColor: color,
        pointRadius: 0,
      },
    ],
  };
  return (
    <Card title={title}>
      <ChartWrap>
        <ChartDiv>
          <Line options={options} data={data} />
        </ChartDiv>
      </ChartWrap>
    </Card>
  );
};

const ChartDiv = styled.div`
  padding: 1rem;
  min-height: 300px;
  position: relative;
`;

const ChartWrap = styled.div`
  min-width: 0;

  /* border: 1px;
  border-style: solid;
  border-color: white;
  border-radius: 10px; */
`;
