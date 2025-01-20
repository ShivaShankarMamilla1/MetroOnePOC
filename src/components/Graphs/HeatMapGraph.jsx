import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";
import { ChartFilters } from "../ChatFilters";

const HeatmapGraph = () => {
  const [filters, setFilters] = useState({
    client: "",
    site: "",
    region: "",
    incidentType: "",
    timeframe: "weekly",
  });
  const options = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"],
    xaxis: {
      title: {
        text: "Hour of Day",
      },
      categories: Array.from({ length: 24 }, (_, i) => i.toString()),
    },
    labels: {
      rotate: -90,
      style: {
        fontSize: "10px",
        colors: "#000",
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            { from: 0, to: 50, color: "#FFEB3B" }, // Light yellow
            { from: 51, to: 100, color: "#FFC107" }, // Dark yellow
            { from: 101, to: 150, color: "#FF9800" }, // Orange
            { from: 151, to: 200, color: "#FF5722" }, // Red
            { from: 201, to: 350, color: "#B71C1C" }, // Dark red
          ],
        },
        distributed: false,
        borderWidth: 0,
      },
    },
    yaxis: {
      title: {
        text: "Day of Week",
      },
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    title: {
      text: "Overall Distribution  Incident’s Volume (hourly)",
      align: "center",
    },
    legend: {
      position: "top",
    },
  };

  // Generate dummy data (random incident counts for each day and hour)
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const series = days.map((day, dayIndex) => ({
    name: day,
    data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 350)),
  }));
  const handleApplyFilters = async () => {
    // Here you would make your API call with the selected filters
    // Example:
    // const response = await fetch('/api/trend-data', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     client: selectedClient,
    //     site: selectedSite,
    //     region: selectedRegion,
    //     incidentType: selectedIncidentType,
    //     timeframe: selectedFilter
    //   })
    // });
    // const newData = await response.json();
    // Update your chart data here
    // setIsDrawerOpen(false);
  };

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
      <ChartFilters
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
      />
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height={380}
      />
    </Box>
  );
};

export default HeatmapGraph;
