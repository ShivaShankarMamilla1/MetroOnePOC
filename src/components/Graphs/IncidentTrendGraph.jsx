import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartFilters } from "../ChatFilters";
import { Box, CircularProgress } from "@mui/material";
import { fetchTrendLinePlotData } from "../../api/graphData";

const TrendGraphWithFilters = () => {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    client: [],
    site: [],
    metroRegion: [],
    incidentType: [],
  });

  const [filters, setFilters] = useState({
    client: "",
    site: "",
    metroRegion: "",
    incidentType: "",
    timeframe: "weekly",
  });

  const [activeFilter, setActiveFilter] = useState({
    client: "",
    site: "",
    metroRegion: "",
    incidentType: "",
    timeframe: "weekly",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTrendLinePlotData(activeFilter);
        console.log("response for trends graph", response);

        const aggregatedData = [];
        if (response.data.graphs && response.data.graphs.length > 0) {
          response.data.graphs.forEach((graph) => {
            if (graph.figure && Array.isArray(graph.figure)) {
              aggregatedData.push(...graph.figure);
            }
          });
          if (response.data.filters) {
            setFilterOptions({
              client: [...new Set(response.data.filters.Client || [])],
              site: [...new Set(response.data.filters.Site || [])],
              metroRegion: [
                ...new Set(response.data.filters["Metro Region"] || []),
              ],
              incidentType: [
                ...new Set(response.data.filters["Incident Type"] || []),
              ],
            });
          }
        }
        console.log("aggregate data from line plot", aggregatedData);
        setGraphData(aggregatedData);
      } catch (e) {
        console.error("Error fetching graph data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter]);

  // Function to dynamically extract data based on timeframe
  const processDataForGraph = () => {
    const timeframeData = graphData.filter((data) => {
      if (filters.timeframe === "daily" && data.Date) return true;
      if (filters.timeframe === "weekly" && data.Week) return true;
      if (filters.timeframe === "monthly" && data.Month) return true;
      if (filters.timeframe === "yearly" && data.Year) return true;
      return false;
    });

    const categories = timeframeData.map((data) =>
      filters.timeframe === "daily"
        ? data.Date
        : filters.timeframe === "weekly"
        ? data.Week
        : filters.timeframe === "monthly"
        ? data.Month
        : data.Year
    );

    const series = [
      {
        name: `${
          filters.timeframe.charAt(0).toUpperCase() + filters.timeframe.slice(1)
        } Trend`,
        data: timeframeData.map((data) => data.Count),
      },
    ];

    return { categories, series };
  };

  const { categories, series } = processDataForGraph();

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: categories,
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

  const handleApplyFilters = async () => {
    setActiveFilter(filters);
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
        filterOptions={filterOptions}
        isDaily={true}
      />
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
        />
      )}
    </Box>
  );
};

export default TrendGraphWithFilters;
