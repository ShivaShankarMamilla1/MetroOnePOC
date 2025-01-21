import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@mui/material";
import { ChartFilters } from "../ChatFilters";

const TrendGraphWithFilters = () => {
  const [filters, setFilters] = useState({
    client: "",
    site: "",
    region: "",
    incidentType: "",
    timeframe: "weekly",
  });

  const data = {
    daily: {
      categories: [
        "2025-01-01",
        "2025-01-02",
        "2025-01-03",
        "2025-01-04",
        "2025-01-05",
        "2025-01-06",
        "2025-01-07",
      ],
      series: [
        {
          name: "Daily Trend",
          data: [120, 150, 130, 170, 160, 140, 180],
        },
      ],
      color: ["#008080"],
    },
    weekly: {
      categories: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
      ],
      series: [
        {
          name: "Moving Average",
          data: [110, 145, 125, 165, 150, 135, 175],
        },
      ],
      color: ["#4169E1"],
    },
    monthly: {
      categories: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
        "Jul 2024",
      ],
      series: [
        {
          name: "Monthly Trend",
          data: [400, 450, 500, 550, 600, 650, 700],
        },
      ],
      color: ["#FF6666"],
    },
    yearly: {
      categories: ["2021", "2022", "2023", "2024", "2025"],
      series: [
        {
          name: "Yearly Trend",
          data: [1000, 2000, 3000, 4000, 5000],
        },
      ],
      color: ["#FFA500"],
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

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: data[filters.timeframe].categories,
      title: {
        text:
          filters.timeframe === "daily"
            ? "Days"
            : filters.timeframe === "weekly"
            ? "Weeks"
            : filters.timeframe === "monthly"
            ? "Months"
            : "Years",
      },
    },
    yaxis: {
      title: { text: "Number of Incidents" },
    },
    stroke: { curve: "straight" },
    markers: { size: 5 },
    colors: data[filters.timeframe].color,
    title: {
      text: `Trend analysis of incident occurrences (${
        filters.timeframe.charAt(0).toUpperCase() + filters.timeframe.slice(1)
      })`,
      align: "center",
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  return (
    <Box
      sx={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "92.5%",
        padding: "5px",
      }}
    >
      <ChartFilters
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
        showTimeFrame={true}
      />
      <ReactApexChart
        options={options}
        series={data[filters.timeframe].series}
        type="line"
        height={300}
      />
    </Box>
  );
};

export default TrendGraphWithFilters;
