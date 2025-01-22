import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartFilters } from "../ChatFilters";
import {
  Box,
  IconButton,
  CircularProgress,
  Typography,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Modal,
} from "@mui/material";
import { fetchTrendLinePlotData } from "../../api/graphData";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CloseIcon from "@mui/icons-material/Close";

const TrendGraphWithFilters = ({
  activeFilter,
  filters,
  incidentTypeOptions,
  showTimeFrame,
}) => {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("weekly");
  const [incidentType, setIncidentType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // const [filters, setFilters] = useState({
  //   client: "",
  //   site: "",
  //   metroRegion: "",
  //   incidentType: "",
  //   timeframe: "weekly",
  // });

  // const [activeFilter, setActiveFilter] = useState({
  //   client: "",
  //   site: "",
  //   metroRegion: "",
  //   incidentType: "",
  //   timeframe: "weekly",
  // });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchTrendLinePlotData({
          ...activeFilter,
          incidentType,
        });

        const aggregatedData = [];
        if (response.data.graphs && response.data.graphs.length > 0) {
          response.data.graphs.forEach((graph) => {
            if (graph.figure && Array.isArray(graph.figure)) {
              aggregatedData.push(...graph.figure);
            }
          });
          // if (response.data.filters) {
          //   setFilterOptions({
          //     client: [...new Set(response.data.filters.Client || [])],
          //     site: [...new Set(response.data.filters.Site || [])],
          //     metroRegion: [
          //       ...new Set(response.data.filters["Metro Region"] || []),
          //     ],
          //     incidentType: [
          //       ...new Set(response.data.filters["Incident Type"] || []),
          //     ],
          //   });
          // }
        }
        setGraphData(aggregatedData);
      } catch (e) {
        console.error("Error fetching graph data:", e);
        setGraphData([]);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter, incidentType]);

  const processDataForGraph = () => {
    const timeframeData = graphData.filter((data) => {
      if (timeframe === "daily" && data.Date) return true;
      if (timeframe === "weekly" && data.Week) return true;
      if (timeframe === "monthly" && data.Month) return true;
      if (timeframe === "yearly" && data.Year) return true;
      return false;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = timeframeData.slice(
      startIndex,
      startIndex + pageSize
    );

    if (paginatedData.length === 0) {
      return {
        categories: ["No data"],
        series: [{ name: "No data", data: [0] }],
        isEmpty: true,
      };
    }

    const categories = paginatedData.map((data) =>
      timeframe === "daily"
        ? data.Date
        : timeframe === "weekly"
        ? data.Week
        : timeframe === "monthly"
        ? data.Month
        : data.Year
    );

    const series = [
      {
        name: `${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Trend`,
        data: paginatedData.map((data) => data.Count),
      },
    ];

    return { categories, series, isEmpty: false };
  };

  const { categories, series, isEmpty } = processDataForGraph();

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: categories,
      title: {
        text: isEmpty
          ? ""
          : timeframe === "daily"
          ? "Days"
          : timeframe === "weekly"
          ? "Weeks"
          : timeframe === "monthly"
          ? "Months"
          : "Years",
      },
      labels: {
        show: !isEmpty,
      },
    },
    yaxis: {
      title: { text: isEmpty ? "" : "Number of Incidents" },
      labels: {
        show: !isEmpty,
      },
    },
    stroke: { curve: "straight" },
    markers: { size: 5 },
    title: {
      text: isEmpty
        ? "No data available for selected filters"
        : `Trend analysis of incident occurrences (${
            timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
          })`,
      align: "center",
    },
    legend: {
      show: !isEmpty,
      position: "top",
      horizontalAlign: "center",
    },
    noData: {
      text: "No data available",
      align: "center",
      verticalAlign: "middle",
    },
  };

  // const handleApplyFilters = () => {
  //   setActiveFilter(filters);
  //   setCurrentPage(1);
  // };

  const totalPages = Math.ceil(
    graphData.filter((data) => {
      if (timeframe === "daily" && data.Date) return true;
      if (timeframe === "weekly" && data.Week) return true;
      if (timeframe === "monthly" && data.Month) return true;
      if (timeframe === "yearly" && data.Year) return true;
      return false;
    }).length / pageSize
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        height: "92.5%",
        padding: "5px",
      }}
    >
      {/* <ChartFilters
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
        showTimeFrame={true}
        filterOptions={filterOptions}
        isDaily={true}
      /> */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <IconButton onClick={toggleModal}>
              {isModalOpen ? <CloseIcon /> : <AspectRatioIcon />}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              PaperProps={{ sx: { padding: "10px", width: "200px" } }}
            >
              <FormControl size="small" fullWidth sx={{ marginBottom: "10px" }}>
                <InputLabel id="incident-type-label">Incident Type</InputLabel>
                <Select
                  labelId="incident-type-label"
                  value={incidentType}
                  onChange={(e) => {
                    setIncidentType(e.target.value);
                    handleMenuClose();
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
              <FormControl fullWidth>
                <InputLabel id="timeframe-label">Timeframe</InputLabel>
                <Select
                  labelId="timeframe-label"
                  value={timeframe}
                  onChange={(e) => {
                    setTimeframe(e.target.value);
                    handleMenuClose();
                  }}
                  label="Timeframe"
                >
                  {/* <MenuItem value="daily">Daily</MenuItem> */}
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Menu>
          </Box>
          <Box sx={{ position: "relative", width: "100%" }}>
            <IconButton
              onClick={handlePrevPage}
              disabled={currentPage === 1 || isEmpty}
              sx={{
                position: "absolute",
                left: "-10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "black",
                visibility: isEmpty ? "hidden" : "visible",
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
              disabled={currentPage === totalPages || isEmpty}
              sx={{
                position: "absolute",
                right: "-30px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "black",
                visibility: isEmpty ? "hidden" : "visible",
              }}
            >
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>

            {!isEmpty && (
              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: "-25px",
                  right: "0",
                  color: "text.secondary",
                }}
              >
                Page {currentPage} of {totalPages}
              </Typography>
            )}
          </Box>
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
                  type="line"
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
        </>
      )}
    </Box>
  );
};

export default TrendGraphWithFilters;
