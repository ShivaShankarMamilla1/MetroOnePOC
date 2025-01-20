import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Box } from "@mui/material";
import { ChartFilters } from "../ChatFilters";

const Heatmap = () => {
  const [filters, setFilters] = useState({
    client: "",
    site: "",
    region: "",
    incidentType: "",
    timeframe: "weekly",
  });

  // Sample data generator (Replace with actual data)
  const generateData = (categories, seriesLength) => {
    return categories.map((category) => ({
      name: category,
      data: Array.from({ length: seriesLength }, () =>
        Math.floor(Math.random() * 100)
      ),
    }));
  };

  // Heatmap data for each filters.timeframe.timeframe
  const heatmapData = {
    weekly: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      series: generateData(["00:00", "06:00", "12:00", "18:00"], 7),
    },
    monthly: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      series: generateData(["00:00", "06:00", "12:00", "18:00"], 12),
    },
    yearly: {
      categories: ["2021", "2022", "2023", "2024"],
      series: generateData(["00:00", "06:00", "12:00", "18:00"], 4),
    },
  };

  const chartOptions = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Hourly Incident Counts",
      align: "center",
    },
    colors: ["#008FFB"],
    xaxis: {
      categories: heatmapData[filters.timeframe].categories,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 20, color: "#E3F2FD" },
            { from: 21, to: 50, color: "#90CAF9" },
            { from: 51, to: 75, color: "#42A5F5" },
            { from: 76, to: 100, color: "#1565C0" },
          ],
        },
      },
    },
  };

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
      {/* Heatmap Chart */}
      <Chart
        options={chartOptions}
        series={heatmapData[filters.timeframe].series}
        type="heatmap"
        height={380}
      />
    </Box>
  );
};

export default Heatmap;
