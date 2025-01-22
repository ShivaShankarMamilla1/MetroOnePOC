import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CloseIcon from "@mui/icons-material/Close";
import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

const Heatmap = ({ activeFilter, incidentTypeOptions }) => {
  const [graphData, setGraphData] = useState([]);
  const [probabilityData, setProbabilityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("weekly");
  const [incidentType, setIncidentType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchIncidentDistributionHeatMap({
          ...activeFilter,
          incidentType,
        });
        const graphIndex = { weekly: 0, monthly: 1, yearly: 2 }[timeframe] || 0;
        const data = response.data.graphs[graphIndex].figure;
        const { series, probabilities } = processHeatmapData(data, timeframe);
        setGraphData(series);
        setProbabilityData(probabilities);
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter, timeframe, incidentType]);

  const processHeatmapData = (data, timeframe) => {
    if (!data || !data.Count || !data.Prob)
      return { series: [], probabilities: [] };

    const processDataByTimeframe = () => {
      switch (timeframe) {
        case "daily":
          return {
            series: data.Hours.map((hour, idx) => ({
              name: `${hour}:00`,
              data: [data.Count[0][idx]],
            })),
            probabilities: data.Hours.map((hour, idx) => ({
              name: `${hour}:00`,
              data: [data.Prob[0][idx]],
            })),
          };
        case "weekly":
          return {
            series: data.Hours.map((hour, hourIdx) => ({
              name: `${hour}:00`,
              data: data.Count.map((dayData) => dayData[hourIdx]),
            })),
            probabilities: data.Hours.map((hour, hourIdx) => ({
              name: `${hour}:00`,
              data: data.Prob.map((dayData) => dayData[hourIdx]),
            })),
          };
        case "monthly":
          return {
            series: data.Weekdays.map((day, dayIdx) => ({
              name: day,
              data: data.Count.map((monthData) => monthData[dayIdx]),
            })),
            probabilities: data.Weekdays.map((day, dayIdx) => ({
              name: day,
              data: data.Prob.map((monthData) => monthData[dayIdx]),
            })),
          };
        case "yearly":
          return {
            series: data.Months.map((month, monthIdx) => ({
              name: month,
              data: data.Count.map((yearData) => yearData[monthIdx]),
            })),
            probabilities: data.Months.map((month, monthIdx) => ({
              name: month,
              data: data.Prob.map((yearData) => yearData[monthIdx]),
            })),
          };
        default:
          return { series: [], probabilities: [] };
      }
    };

    return processDataByTimeframe();
  };

  const getChartOptions = () => ({
    chart: {
      type: "heatmap",
      toolbar: { show: false },
    },
    dataLabels: { enabled: true },
    title: {
      text: `Incident Distribution (${timeframe})`,
      align: "center",
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const probability = probabilityData[seriesIndex]?.data[dataPointIndex];
        return `<div class="p-2">
          <div>Count: ${value}</div>
          <div>Probability: ${probability ? probability.toFixed(2) : 0}%</div>
        </div>`;
      },
    },
    xaxis: {
      categories: {
        daily: ["Today"],
        weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        monthly: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        yearly: ["2020", "2021", "2022", "2023", "2024", "2025"],
      }[timeframe],
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 100, color: "#FFEB3B" },
            { from: 101, to: 300, color: "#FFC107" },
            { from: 301, to: 600, color: "#42A5F5" },
            { from: 601, to: 5000, color: "#1565C0" },
          ],
        },
      },
    },
  });
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box sx={{ width: "95%", height: "100%", padding: "5px" }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            height: "85%",
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
              {isModalOpen ? <CloseIcon /> : <FullscreenIcon/>}
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
          <Chart
            options={getChartOptions()}
            series={graphData}
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

          {/* Graph in Modal */}
          <Chart
            options={getChartOptions()}
            series={graphData}
            type="heatmap"
            height={550}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Heatmap;
