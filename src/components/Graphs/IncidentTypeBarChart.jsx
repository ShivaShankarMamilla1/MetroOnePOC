import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  IconButton,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { ChartFilters } from "../ChatFilters";
import { incidentTypesHistogramData } from "../../data/data";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fetchIncidentTypes } from "../../api/graphData";

const IncidentTypeBarChart = ({ activeFilter, filters }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [filters, setFilters] = useState({
  //   client: "",
  //   site: "",
  //   metroRegion: "",
  //   incidentType: "",
  //   timeframe: "weekly",
  // });
  // Separate state for active filters that will trigger the API call
  // const [activeFilter, setActiveFilter] = useState({
  //   client: "",
  //   site: "",
  //   metroRegion: "",
  //   incidentType: "",
  // });
  // State for temporary filters that update on change but don't trigger API
  const [tempFilters, setTempFilters] = useState({
    client: "",
    site: "",
    metroRegion: "",
    incidentType: "",
  });
  const itemsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchIncidentTypes(activeFilter);
        // setFilters((prevFilters) => ({
        //   ...prevFilters,
        //   client: response.data.filters.Client || "",
        //   site: response.data.filters.Site || "",
        //   metroRegion: response.data.filters["Metro Region"] || "",
        //   incidentType: response.data.filters["Incident Type"] || "",
        //   timeframe: "",
        // }));
        const aggregatedData = [];
        if (response.data.graphs && response.data.graphs.length > 0) {
          response.data.graphs.forEach((graph) => {
            if (graph.figure && Array.isArray(graph.figure)) {
              aggregatedData.push(...graph.figure);
            }
          });
        }
        setGraphData(aggregatedData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter]); // Only depends on activeFilter now

  // Get all data
  const categoryData = graphData.map(
    (eachIncident) => eachIncident["Incident Type"]
  );
  const countData = graphData.map((eachIncident) => eachIncident["Count"]);
  const totalPages = Math.ceil(categoryData.length / itemsPerPage);

  const getCurrentPageData = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      categories: categoryData.slice(start, end),
      counts: countData.slice(start, end),
    };
  };

  const currentData = getCurrentPageData();

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: true },
      animations: { enabled: true },
    },
    colors: ["#808000"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: currentData.categories,
      labels: {
        rotate: -90,
        style: { fontSize: "10px" },
      },
      title: {
        text: "Incident Type",
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
      text: "Overall Distribution of Incident types",
      align: "center",
    },
  };

  const series = [{ name: "Count", data: currentData.counts }];

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // const handleApplyFilters = () => {
  //   // Update activeFilter with tempFilters to trigger API call
  //   setActiveFilter(tempFilters);
  // };

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
      {/* <ChartFilters
        filters={tempFilters}
        onFiltersChange={setTempFilters}
        filterOptions={filters}
        onApplyFilters={handleApplyFilters}
        isIncidentType={false}
      /> */}

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "400px",
            alignItems: "center",
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
            options={options}
            series={series}
            type="bar"
            height={400}
          />

          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
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

export default IncidentTypeBarChart;
