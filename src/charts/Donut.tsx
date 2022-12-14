import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { Card } from "../layouts/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface dataprop {
  key: string;
  value: number;
}

interface props {
  plotdata: dataprop[];
  title: string;
}

export const Donut = ({ plotdata, title }: props) => {
  // console.log(plotdata);

  const labels = plotdata.map((data) => {
    return data.key;
  });
  const vals = plotdata.map((data) => {
    return data.value;
  });

  const alpha = 0.5;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: vals,
        backgroundColor: [
          `rgba(255, 99, 132, ${alpha})`,
          `rgba(54, 162, 235, ${alpha})`,
          `rgba(255, 206, 86, ${alpha})`,
          `rgba(75, 192, 192, ${alpha})`,
          `rgba(153, 102, 255, ${alpha})`,
          `rgba(255, 159, 64, ${alpha})`,
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
      <ChartWrap>
        <ChartDiv>
          <Doughnut data={data} options={options} />
        </ChartDiv>
      <ChartFooter>{title}</ChartFooter>
      </ChartWrap>
  );
};

const ChartDiv = styled.div`
  padding: 1rem;
  min-height: 300px;
  max-height: 300px;
  position: relative;
`;

const ChartWrap = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  border: 1px;
  border-style: solid;
  border-color: white;
  border-radius: 10px;
`;

const ChartFooter = styled.div`
  padding: 10px;
  font-size: 12px;
`;