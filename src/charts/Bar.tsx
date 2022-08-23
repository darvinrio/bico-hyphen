import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from "chart.js";
  import { dateFormatter } from "../utils/PlotHelpers";
  
  import { Bar } from "react-chartjs-2";
  import styled from "styled-components";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
  }
  
  export const BarPlot = ({ plotdata, color }: props) => {
    plotdata.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
  
    const timestamps = plotdata.map((data) => {
      return dateFormatter(data.timestamp);
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
        scales: {
          x: {
            type: "time",
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value: number, index: number) {
                return "$" + value;
              },
            },
          },
          y: {
            grid: {
              display: false,
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
      <ChartWrap>
        <ChartDiv>
          <Bar options={options} data={data} />
        </ChartDiv>
      </ChartWrap>
    );
  };
  
  const ChartDiv = styled.div`
    padding: 1rem ;
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
  