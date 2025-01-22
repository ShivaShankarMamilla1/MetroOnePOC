import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  IconButton,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  CircularProgress,
  Modal,
} from "@mui/material";
import { ChartFilters } from "../ChatFilters";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CloseIcon from "@mui/icons-material/Close";
import { fetchHourlyIncidentHeatMapData } from "../../api/graphData";

const HeatmapGraph = ({
  activeFilter,
  filters,
  incidentTypeOptions,
  showTimeFrame,
}) => {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [incidentType, setIncidentType] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMenuOpen = Boolean(menuAnchorEl);
  // const [filters, setFilters] = useState({
  //   client: "",
  //   site: "",
  //   metroRegion: "",
  //   incidentType: "",
  //   timeframe: "weekly",
  // });
  // // Separate state for active filters that will trigger the API call
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
  useEffect(() => {
    setMenuAnchorEl(null);
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchHourlyIncidentHeatMapData({
          ...activeFilter,
          incidentType,
        });
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
  }, [activeFilter, incidentType]);
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
            { from: 201, to: 1000, color: "#B71C1C" }, // Dark red
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
      showForZeroSeries: false,
      labels: {
        // Hide specific range values above 300 in the legend
        formatter: (seriesName) => {
          // Filter out the highest range from the legend
          if (seriesName === "1.79+") {
            return ""; // Empty return hides that entry from the legend
          }
          return seriesName;
        },
      },
    },
  };

  // Generate dummy data (random incident counts for each day and hour)
  const days = graphData.map((eachDay) => eachDay);
  const series = days.map((eachDay, dayIndex) => ({
    name: eachDay.Day,
    data: eachDay.Count,
  }));
  // const handleApplyFilters = async () => {
  //   setActiveFilter(tempFilters);
  // };
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
      {/* <ChartFilters
        filters={tempFilters}
        onFiltersChange={setTempFilters}
        filterOptions={filters}
        onApplyFilters={handleApplyFilters}
      /> */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
              position: "relative",
            }}
          >
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <IconButton onClick={toggleModal}>
              {isModalOpen ? <CloseIcon /> : <FullscreenIcon/>}
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  padding: "10px",
                  width: "250px",
                },
              }}
            >
              <FormControl size="small" fullWidth sx={{ marginBottom: "10px" }}>
                <InputLabel id="incident-type-label">Incident Type</InputLabel>
                <Select
                  labelId="incident-type-label"
                  value={incidentType}
                  onChange={(e) => {
                    setIncidentType(e.target.value), handleMenuClose();
                  }}
                  label="Incident Type"
                >
                  {incidentTypeOptions.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {showTimeFrame && (
                <FormControl size="small" fullWidth>
                  <InputLabel id="timeframe-label">Time Frame</InputLabel>
                  <Select
                    labelId="timeframe-label"
                    value={timeFrame}
                    onChange={(e) => {
                      setTimeFrame(e.target.value), handleMenuClose();
                    }}
                    label="Time Frame"
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Menu>
          </Box>
          <ReactApexChart
            options={options}
            series={series}
            type="heatmap"
            height={380}
          />
        </>
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
            height: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Minimize icon in the top-right corner */}
          <IconButton
            onClick={toggleModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1, // Ensure it's above other content
              color: "error.main",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <ReactApexChart
            options={options}
            series={series}
            type="heatmap"
            height={750}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default HeatmapGraph;
