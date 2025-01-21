import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartFilters } from "../ChatFilters";
import { Box, IconButton, CircularProgress } from "@mui/material";
import { fetchTimeIncidentsHistogramData } from "../../api/graphData";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HistoricIncidentsChart = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [graphData, setGraphData] = useState([]); // Holds the chart data
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

  const pageSize = 10; // Number of data points per page

  // Fetch graph data when active filters change
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setGraphData([]); // Clear previous graph data when fetching new data

        const response = await fetchTimeIncidentsHistogramData(activeFilter);

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
              metroRegion: [...new Set(response.data.filters["Metro Region"] || [])],
              incidentType: [...new Set(response.data.filters["Incident Type"] || [])],
            });
          }
        }
        console.log("aggregatedData",aggregatedData)
        setGraphData(aggregatedData); // Update graphData with the new filtered data
        setCurrentPage(0); // Reset to first page when new data comes in
      } catch (e) {
        console.error("Error fetching graph data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter]);

  // Apply filters and reload the graph
  const handleApplyFilters = () => {
    console.log("applied filter")
    setCurrentPage(0); // Reset to the first page
    setActiveFilter(filters); // Trigger data fetching based on new filters
  };

  // Pagination: Go to the previous page
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  // Pagination: Go to the next page
  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const maxPage = Math.ceil(graphData.length / pageSize) - 1;
      return Math.min(prev + 1, maxPage);
    });
  };

  // Paginate the current graph data
  const paginatedData = graphData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  // Prepare data for the chart
  // const processData = () => {
  //   let categories = [];
  //   let seriesData = [];

  //   paginatedData.forEach((dataPoint) => {
  //     if (filters.timeframe === "weekly" && dataPoint.Week) {
  //       categories.push(dataPoint.Week);
  //       seriesData.push(dataPoint.Count);
  //     } else if (filters.timeframe === "monthly" && dataPoint.Month) {
  //       categories.push(dataPoint.Month);
  //       seriesData.push(dataPoint.Count);
  //     } else if (filters.timeframe === "yearly" && dataPoint.Year) {
  //       categories.push(dataPoint.Year);
  //       seriesData.push(dataPoint.Count);
  //     }
  //   });

  //   return { categories, seriesData };
  // };

  // Process data to fit the chart
  useEffect(()=>{
    console.log("timeframe change")
    setCurrentPage(0);
    processData();
  },[filters.timeframe])

const processData = () => {
  let categories = [];
  let seriesData = [];

  // Check the active timeframe filter and only process the relevant data
  if (filters.timeframe === "weekly") {
    paginatedData.forEach((dataPoint) => {
      if (dataPoint.Week) {
        categories.push(dataPoint.Week);
        seriesData.push(dataPoint.Count);
      }
    });
  } else if (filters.timeframe === "monthly") {
    paginatedData.forEach((dataPoint) => {
      if (dataPoint.Month) {
        categories.push(dataPoint.Month);
        seriesData.push(dataPoint.Count);
      }
    });
  } else if (filters.timeframe === "yearly") {
    paginatedData.forEach((dataPoint) => {
      if (dataPoint.Year) {
        categories.push(dataPoint.Year);
        seriesData.push(dataPoint.Count);
      }
    });
  }

  return { categories, seriesData };
};


  const { categories, seriesData } = processData();

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#800080"],
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
      categories: categories,
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
      },
      title: {
        text: filters?.timeframe?.charAt(0)?.toUpperCase() + filters?.timeframe?.slice(1) || "Weekly",
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
      text: `Historic Incident's volume distribution (${filters.timeframe})`,
      align: "center",
    },
  };

  const chartSeries = [
    {
      name: "Incident Count",
      data: seriesData,
    },
  ];

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
        filterOptions={filterOptions}
        onApplyFilters={handleApplyFilters}
        showTimeFrame={true}
        isDaily={false}
      />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 350,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ position: "relative", width: "100%" }}>
          <IconButton
            onClick={handlePrevPage}
            disabled={currentPage === 0}
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
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
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

export default HistoricIncidentsChart;
