import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  IconButton,
  Typography,
  Stack,
  CircularProgress,
  Modal,
} from "@mui/material";
import { ChartFilters } from "../ChatFilters";
import { incidentTypesHistogramData } from "../../data/data";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fetchIncidentTypes } from "../../api/graphData";
// import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CloseIcon from "@mui/icons-material/Close";

const IncidentTypeBarChart = ({ activeFilter, filters }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        style: { fontSize: "12px" },
      },
      title: {
        text: "Incident Type",
        style: { fontWeight: 1000 },
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
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

          <IconButton
            onClick={toggleModal}
            sx={{
              position: "absolute",
              top: { xs: "8px", sm: "10px" }, // Adjust for small screens
              right: { xs: "8px", sm: "10px" }, // Adjust for small screens
              zIndex: 1,
              color: "black",
            }}
          >
            {isModalOpen ? <CloseIcon /> : <FullscreenIcon />}
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
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Minimize Icon */}
          <IconButton
            onClick={toggleModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              color: "error.main",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Graph in Modal */}
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            {/* Left Arrow */}
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

            {/* Graph */}
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={650}
            />

            {/* Right Arrow */}
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
        </Box>
      </Modal>
    </Box>
  );
};

export default IncidentTypeBarChart;
