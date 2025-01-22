import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Menu,
  TextField,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CloseIcon from "@mui/icons-material/Close";
import { fetchForecastData } from "../../api/graphData";

const LineChart = ({
  activeFilter,
  filters,
  incidentTypeOptions,
  showTimeFrame,
}) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [incidentType, setIncidentType] = useState("");
  const [timeFrame, setTimeFrame] = useState("daily");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const isMenuOpen = Boolean(menuAnchorEl);

  const chartOptions = {
    chart: {
      type: "line",
      background: "#1E1E2F",
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: "dark",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    yaxis: {
      title: {
        text: "Incident Count",
        style: {
          color: "#FFFFFF",
        },
      },
      labels: {
        style: {
          colors: "#FFFFFF",
        },
      },
    },
    legend: {
      position: "top",
      labels: {
        colors: "#FFFFFF",
      },
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["#007FFF", "#4CAF50", "#FFA726"],
    title: {
      text: "Future Projection: Incident Counts",
      align: "center",
      style: {
        fontSize: "16px",
        color: "#FFFFFF",
      },
    },
    subtitle: {
      text: "Last Week vs. Predicted Week",
      align: "center",
      style: {
        fontSize: "14px",
        color: "#AAAAAA",
      },
    },
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setMenuAnchorEl(null);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchForecastData({
          ...activeFilter,
          incidentType,
          timeFrame,
        });
        const graphData = response.data.graphs[0].figure;

        const formattedData = [
          {
            name: "Actual 42 days",
            data: graphData["Actual 42 days"].map((item) => ({
              x: new Date(parseDate(item.date)).toISOString(),
              y: item.count,
            })),
          },
          {
            name: "Predicted 42 days",
            data: graphData["Predicted 42 days"].map((item) => ({
              x: new Date(parseDate(item.date)).toISOString(),
              y: item.count,
            })),
          },
          {
            name: "Next week projection",
            data: graphData["Next week projection"].map((item) => ({
              x: new Date(parseDate(item.date)).toISOString(),
              y: item.count,
            })),
          },
        ];

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeFilter, incidentType, timeFrame]);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleApplyFilters = () => {
    handleMenuClose(); // Close menu after applying filters
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
        position: "relative",
      }}
    >
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
          {/* Three dots menu */}
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
              {isModalOpen ? <CloseIcon /> : <FullscreenIcon />}
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
              {/* <FormControl size="small" fullWidth>
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
              </FormControl> */}
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <button onClick={handleApplyFilters}>Apply</button>
              </Box> */}
            </Menu>
          </Box>

          {/* Chart */}
          <Chart
            options={chartOptions}
            series={chartData}
            type="line"
            height={450}
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
            height: "90%",
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
              top: 2,
              right: 2,
              zIndex: 1, // Ensure it's above other content
              color: "error.main",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Chart
            options={chartOptions}
            series={chartData}
            type="line"
            height={720}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default LineChart;
