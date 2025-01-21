import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartFilters } from "../ChatFilters";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { fetchTrendLinePlotData } from "../../api/graphData";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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


    useEffect(()=>{
      console.log("timeframe change")
      setCurrentPage(1);
    },[filters.timeframe])

  // Function to dynamically extract data based on timeframe and pagination
  const processDataForGraph = () => {
    const timeframeData = graphData.filter((data) => {
      if (filters.timeframe === "daily" && data.Date) return true;
      if (filters.timeframe === "weekly" && data.Week) return true;
      if (filters.timeframe === "monthly" && data.Month) return true;
      if (filters.timeframe === "yearly" && data.Year) return true;
      return false;
    });

    // Apply pagination by slicing data
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = timeframeData.slice(startIndex, startIndex + pageSize);

    const categories = paginatedData.map((data) =>
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
        data: paginatedData.map((data) => data.Count),
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
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle pagination navigation
  const handleNextPage = () => {
    if (currentPage < Math.ceil(graphData.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
         <Box sx={{ position: "relative", width: "100%" }}>
        <IconButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            sx={{
              position: "absolute",
              left: "-10px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              color: "black",
            }}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>

          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={300}
          />

        <IconButton
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(graphData.length / pageSize) - 1}
            sx={{
              position: "absolute",
              right: "-30px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              color: "black",
            }}
          >
            <KeyboardArrowRightIcon fontSize="large" />
          </IconButton>  
         
          </Box>
      )}
    </Box>
  );
};

export default TrendGraphWithFilters;
