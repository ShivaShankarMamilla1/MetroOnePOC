import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartFilters } from "../ChatFilters";
import { Box } from "@mui/material";

const HistoricIncidentsChart = () => {
  // const [filters.timeframe, setTimeFilter] = useState("Weekly");
  const [filters, setFilters] = useState({
    client: "",
    site: "",
    region: "",
    incidentType: "",
    timeframe: "weekly",
  });

  // Data for each filter option
  const data = {
    weekly: {
      categories: [
        "2021-12-27/2022-01-02",
        "2022-01-03/2022-01-09",
        "2022-01-10/2022-01-16",
        "2022-01-17/2022-01-23",
        "2022-01-24/2022-01-30",
        "2022-01-31/2022-02-06",
        "2022-02-07/2022-02-13",
        "2022-02-14/2022-02-20",
        "2022-02-21/2022-02-27",
        "2022-02-28/2022-03-06",
        "2022-03-07/2022-03-13",
        "2022-03-14/2022-03-20",
        "2022-03-21/2022-03-27",
        "2022-03-28/2022-04-03",
        "2022-04-04/2022-04-10",
        "2022-04-11/2022-04-17",
        "2022-04-18/2022-04-24",
        "2022-04-25/2022-05-01",
        // Add more weekly data as needed
      ],
      series: [
        75, 125, 100, 90, 110, 105, 95, 85, 115, 120, 130, 140, 135, 145, 155,
        165, 175, 180,
      ],
    },
    monthly: {
      categories: [
        "Jan 2022",
        "Feb 2022",
        "Mar 2022",
        "Apr 2022",
        "May 2022",
        "Jun 2022",
        "Jul 2022",
        "Aug 2022",
        "Sep 2022",
        "Oct 2022",
        "Nov 2022",
        "Dec 2022",
        // Add more months as needed
      ],
      series: [400, 500, 600, 700, 750, 800, 850, 900, 1000, 1050, 1100, 1200],
    },
    yearly: {
      categories: ["2021", "2022", "2023", "2024"], // Add years as needed
      series: [1200, 1800, 2400, 3000], // Replace with actual yearly data
    },
  };

  // Configurations for ApexCharts
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#800080"], // Purple color
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data[filters.timeframe].categories,
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
      },
      title: {
        text: "Week",
        style: { fontWeight: 600 },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: { fontWeight: 600 },
      },
    },
    title: {
      text: `Historic Incident’s volume distribution (${filters.timeframe})`,
      align: "center",
    },
  };

  const chartSeries = [
    {
      name: "Incident Count",
      data: data[filters.timeframe].series,
    },
  ];
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
        showTimeFrame={true}
        isDaily={false}
      />
      {/* Chart */}
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </Box>
  );
};

export default HistoricIncidentsChart;
