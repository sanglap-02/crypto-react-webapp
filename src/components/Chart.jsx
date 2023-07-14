import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  const prices = [];
  const date = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
    else date.push(new Date(arr[i][0]).toLocaleDateString());
    prices.push(arr[i][1]);
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        borderColor: "rgb(184,255,186)",
        backgroundColor: "green",
        color: "white",
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
        color: "white",
        plugins: {
          legend: {
            labels: {
              color: 'white', // Color of the legend labels
            },
          },
        },
        scales: {
      x: {
        ticks: {
          color: 'white', // Color of the x-axis labels
        },
        grid: {
          color: 'rgba(38, 38, 38)', // Color of the x-axis grid lines
        },
      },
      y: {
        ticks: {
          color: 'white', // Color of the y-axis labels
        },
        grid: {
          color: 'rgba(38, 38, 38)', // Color of the y-axis grid lines
        },
      },
    },
      }}
      data={data}
    />
  );
};

export default Chart;