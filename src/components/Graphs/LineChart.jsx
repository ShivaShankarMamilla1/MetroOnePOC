import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Box } from "@mui/material";
import { fetchForecastData } from "../../api/graphData";

const LineChart = () => {
  const [chartData, setChartData] = useState([]);
  const chartOptions = {
    chart: {
      type: "line",
      background: "#1E1E2F",
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: "dark",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    yaxis: {
      title: {
        text: "Incident Count",
        style: {
          color: "#FFFFFF",
        },
      },
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    legend: {
      position: "top",
      labels: {
        colors: "#FFFFFF",
      },
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["#007FFF", "#4CAF50", "#FFA726"],
    title: {
      text: "Future Projection: Incident Counts",
      align: "center",
      style: {
        fontSize: "16px",
        color: "#FFFFFF",
      },
    },
    subtitle: {
      text: "Last Week vs. Predicted Week",
      align: "center",
      style: {
        fontSize: "14px",
        color: "#AAAAAA",
      },
    },
  };

  const seriesData = [
    {
      name: "Actual Last Week",
      data: [
        { x: "2024-12-01", y: 20 },
        { x: "2024-12-02", y: 15 },
        { x: "2024-12-03", y: 25 },
        { x: "2024-12-04", y: 10 },
        { x: "2024-12-05", y: 18 },
        { x: "2024-12-06", y: 22 },
        { x: "2024-12-07", y: 17 },
      ],
    },
    {
      name: "Predicted Last Week",
      data: [
        { x: "2024-12-01", y: 12 },
        { x: "2024-12-02", y: 14 },
        { x: "2024-12-03", y: 15 },
        { x: "2024-12-04", y: 8 },
        { x: "2024-12-05", y: 16 },
        { x: "2024-12-06", y: 20 },
        { x: "2024-12-07", y: 13 },
      ],
    },
    {
      name: "Predicted Next Week",
      data: [
        { x: "2024-12-08", y: 14 },
        { x: "2024-12-09", y: 18 },
        { x: "2024-12-10", y: 20 },
        { x: "2024-12-11", y: 12 },
        { x: "2024-12-12", y: 16 },
      ],
    },
  ];
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchForecastData();
        console.log("response for line chart predict", response);
        const graphData = response.data.graphs[0].figure;
        console.log("response for line chart predict only graph", graphData);

        const formattedData = [
          {
            name: "Actual 42 days",
            data: graphData["Actual 42 days"].map((item) => ({
              x: new Date(parseDate(item.date)).toISOString(),
              y: item.count,
            })),
          },
          {
            name: "Predicted 42 days",
            data: graphData["Predicted 42 days"].map((item) => ({
              x: new Date(parseDate(item.date)).toISOString(),
              y: item.count,
            })),
          },
          {
            name: "Next week projection",
            data: graphData["Next week projection"].map((item) => ({
              x: new Date(parseDate(item.date)).toISOString(),
              y: item.count,
            })),
          },
        ];

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "5px",
      }}
    >
      <Chart
        options={chartOptions}
        series={chartData}
        type="line"
        height={400}
      />
    </Box>
  );
};

export default LineChart;
