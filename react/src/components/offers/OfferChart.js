import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const OfferChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios("/offers/chart");

        const labels = data.labels;
        const datasets = [{
          label: "Sevk edilen",
          data: data.datasets.map(d => d.data),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          barPercentage: 0.9,
        }];

        const updatedChartData = {
          labels: labels,
          datasets: datasets,
        };

        setChartData(updatedChartData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-200 max-w-2xl opacity-90 my-2 mx-auto">
      {chartData.labels && chartData.labels.length > 0 ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                stacked: false,
                grid: {
                  display: false,
                },
                // ticks: {
                //   display: true,
                // },
              },
              y: {
                stacked: false,
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default OfferChart;
