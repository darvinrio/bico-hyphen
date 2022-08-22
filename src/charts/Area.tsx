import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from "chart.js";
  import { dateFormatter } from "../utils/PlotHelpers";
  
  import styled from "styled-components";
  import { Bar, Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  
  interface dataprop {
    timestamp: number;
    balance: number;
  }
  
  interface props {
    plotdata: dataprop[];
  }
  
  export const Area = ({ plotdata }: props) => {
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
      interaction: {
        intersect: false,
        mode: 'index' as "index",
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
          backgroundColor: "rgba(255, 105, 180, 0.2)",
          borderWidth: 1,
          borderColor: "hotpink",
          pointRadius: 0,
        },
      ],
    };
    return (
      <>
        <Line options={options} data={data} />
      </>
    );
  };
  