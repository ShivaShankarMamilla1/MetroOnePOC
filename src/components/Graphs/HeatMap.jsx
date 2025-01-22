// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import {
//   Box,
//   CircularProgress,
//   Menu,
//   MenuItem,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

// const Heatmap = ({ activeFilter, incidentTypeOptions }) => {
//   const [graphData, setGraphData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [timeframe, setTimeframe] = useState("weekly");
//   const [incidentType, setIncidentType] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchIncidentDistributionHeatMap({
//           ...activeFilter,
//           incidentType,
//         });
//         const graphIndex = { weekly: 0, monthly: 1, yearly: 2 }[timeframe] || 0;
//         const data = response.data.graphs[graphIndex].figure;
//         const processedData = processHeatmapData(data, timeframe);
//         setGraphData(processedData);
//       } catch (error) {
//         console.error("Error fetching heatmap data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [activeFilter, timeframe, incidentType]);

//   const processHeatmapData = (data, timeframe) => {
//     console.log("data from process func", data);
//     if (!data || !data.Count || !data.Prob) return [];
//     switch (timeframe) {
//       case "daily":
//         return data.Hours.map((hour, idx) => ({
//           name: `${hour}:00`,
//           data: [data.Count[0][idx]],
//         }));
//       case "weekly":
//         return data.Hours.map((hour, hourIdx) => ({
//           name: `${hour}:00`,
//           data: data.Count.map((dayData) => dayData[hourIdx]),
//         }));
//       case "monthly":
//         return data.Weekdays.map((day, dayIdx) => ({
//           name: day,
//           data: data.Count.map((monthData) => monthData[dayIdx]),
//         }));
//       case "yearly":
//         return data.Months.map((month, monthIdx) => ({
//           name: month,
//           data: data.Count.map((yearData) => yearData[monthIdx]),
//         }));
//       default:
//         return [];
//     }
//   };

//   const getChartOptions = () => ({
//     chart: {
//       type: "heatmap",
//       toolbar: { show: false },
//     },
//     dataLabels: { enabled: true },
//     title: {
//       text: `Incident Distribution (${timeframe})`,
//       align: "center",
//     },
//     tooltip: {
//       y: {
//         formatter: (value, { seriesIndex, dataPointIndex, w }) => {
//           const probability =
//             w.config.series[seriesIndex].data[dataPointIndex].Prob;
//           return `Value: ${value}<br/>Probability: ${probability}%`;
//         },
//       },
//     },
//     xaxis: {
//       categories: {
//         daily: ["Today"],
//         weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//         monthly: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sept",
//           "Oct",
//           "Nov",
//           "Dec",
//         ],
//         yearly: ["2020", "2021", "2022", "2023", "2024", "2025"],
//       }[timeframe],
//     },
//     plotOptions: {
//       heatmap: {
//         shadeIntensity: 0.5,
//         colorScale: {
//           ranges: [
//             { from: 0, to: 100, color: "#FFEB3B" },
//             { from: 101, to: 300, color: "#FFC107" },
//             { from: 301, to: 600, color: "#42A5F5" },
//             { from: 601, to: 5000, color: "#1565C0" },
//           ],
//         },
//       },
//     },
//   });

//   return (
//     <Box sx={{ width: "95%", height: "100%", padding: "5px" }}>
//       {/* Menu Icon for Filters */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//         <IconButton onClick={handleMenuOpen}>
//           <MoreVertIcon />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={isMenuOpen}
//           onClose={handleMenuClose}
//           PaperProps={{ sx: { padding: "10px", width: "200px" } }}
//         >
//           <FormControl size="small" fullWidth sx={{ marginBottom: "10px" }}>
//             <InputLabel id="incident-type-label">Incident Type</InputLabel>
//             <Select
//               labelId="incident-type-label"
//               value={incidentType}
//               onChange={(e) => {
//                 setIncidentType(e.target.value), handleMenuClose();
//               }}
//               label="Incident Type"
//             >
//               {incidentTypeOptions.map((item, index) => (
//                 <MenuItem key={index} value={item}>
//                   {item}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth>
//             <InputLabel id="timeframe-label">Timeframe</InputLabel>
//             <Select
//               labelId="timeframe-label"
//               value={timeframe}
//               onChange={(e) => {
//                 setTimeframe(e.target.value);
//                 handleMenuClose(); // Close menu on change
//               }}
//               label="Timeframe"
//             >
//               <MenuItem value="daily">Daily</MenuItem>
//               <MenuItem value="weekly">Weekly</MenuItem>
//               <MenuItem value="monthly">Monthly</MenuItem>
//               <MenuItem value="yearly">Yearly</MenuItem>
//             </Select>
//           </FormControl>
//         </Menu>
//       </Box>

//       {isLoading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             p: 4,
//             height: "85%",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Chart
//           options={getChartOptions()}
//           series={graphData}
//           type="heatmap"
//           height={380}
//         />
//       )}
//     </Box>
//   );
// };

// export default Heatmap;
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

const Heatmap = ({ activeFilter, incidentTypeOptions }) => {
  const [graphData, setGraphData] = useState([]);
  const [probabilityData, setProbabilityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("weekly");
  const [incidentType, setIncidentType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
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
    </Box>
  );
};

export default Heatmap;
