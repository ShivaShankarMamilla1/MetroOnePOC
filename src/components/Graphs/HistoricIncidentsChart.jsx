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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchTimeIncidentsHistogramData } from "../../api/graphData";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CloseIcon from "@mui/icons-material/Close";

const HistoricIncidentsChart = ({
  activeFilter,
  filters,
  incidentTypeOptions,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("weekly");
  const [incidentType, setIncidentType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const [filterOptions, setFilterOptions] = useState({
    client: [],
    site: [],
    metroRegion: [],
    incidentType: [],
  });
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

  const pageSize = 10;

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setGraphData([]);

        const response = await fetchTimeIncidentsHistogramData({
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
        setCurrentPage(0);
      } catch (e) {
        console.error("Error fetching graph data:", e);
        setGraphData([]);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter, incidentType]);

  // useEffect(() => {
  //   setCurrentPage(0);
  // }, [timeframe]);

  // const handleApplyFilters = () => {
  //   setActiveFilter(filters);
  // };

  const filteredData = graphData.filter((dataPoint) => {
    if (timeframe === "weekly" && dataPoint.Week) return true;
    if (timeframe === "monthly" && dataPoint.Month) return true;
    if (timeframe === "yearly" && dataPoint.Year) return true;
    return false;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const processData = () => {
    if (paginatedData.length === 0) {
      return {
        categories: ["No data"],
        seriesData: [0],
        isEmpty: true,
      };
    }

    let categories = [];
    let seriesData = [];

    paginatedData.forEach((dataPoint) => {
      if (timeframe === "weekly" && dataPoint.Week) {
        categories.push(dataPoint.Week);
        seriesData.push(dataPoint.Count);
      } else if (timeframe === "monthly" && dataPoint.Month) {
        categories.push(dataPoint.Month);
        seriesData.push(dataPoint.Count);
      } else if (timeframe === "yearly" && dataPoint.Year) {
        categories.push(dataPoint.Year);
        seriesData.push(dataPoint.Count);
      }
    });

    return { categories, seriesData, isEmpty: false };
  };

  const { categories, seriesData, isEmpty } = processData();

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
        show: !isEmpty,
      },
      title: {
        text: isEmpty
          ? ""
          : filters?.timeframe?.charAt(0)?.toUpperCase() +
              filters?.timeframe?.slice(1) || "Weekly",
        style: { fontWeight: 600 },
      },
    },
    yaxis: {
      title: {
        text: isEmpty ? "" : "Count",
        style: { fontWeight: 600 },
      },
      labels: {
        show: !isEmpty,
      },
    },
    title: {
      text: isEmpty
        ? "No data available for selected filters"
        : `Historic Incident's volume distribution (${timeframe})`,
      align: "center",
    },
    noData: {
      text: "No data available",
      align: "center",
      verticalAlign: "middle",
    },
  };

  const chartSeries = [
    {
      name: "Incident Count",
      data: seriesData,
    },
  ];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
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
        height: "100%",
        padding: "5px",
      }}
    >
      {/* <ChartFilters
        filters={filters}
        onFiltersChange={setFilters}
        filterOptions={filterOptions}
        onApplyFilters={handleApplyFilters}
        showTimeFrame={true}
        isDaily={false}
      /> */}
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
              disabled={currentPage === 0 || isEmpty}
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
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />

            <IconButton
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1 || isEmpty}
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
                Page {currentPage + 1} of {totalPages}
              </Typography>
            )}
          </Box>
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
              options={chartOptions}
              series={chartSeries}
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

export default HistoricIncidentsChart;
