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
  
  import { Line } from "react-chartjs-2";
  
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
  
  export interface dataprop {
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
      maintainAspectRatio: false,
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
            ticks: {
              callback: function(value:number, index:number) {
                  return '$' + value;
              }
            }
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
      <div>
        <Line options={options} data={data} />
      </ div>
    );
  };
  