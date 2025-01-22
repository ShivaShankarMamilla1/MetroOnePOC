// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import { Box, CircularProgress } from "@mui/material";
// import { fetchForecastData } from "../../api/graphData";

// const LineChart = ({ activeFilter, filters, incidentTypeOptions }) => {
//   console.log("incident type options from chart", incidentTypeOptions);
//   const [chartData, setChartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [incidentType, setIncidentType] = useState("");
//   const chartOptions = {
//     chart: {
//       type: "line",
//       background: "#1E1E2F",
//       toolbar: {
//         show: false,
//       },
//     },
//     theme: {
//       mode: "dark",
//     },
//     stroke: {
//       curve: "smooth",
//       width: 2,
//     },
//     markers: {
//       size: 4,
//     },
//     xaxis: {
//       type: "datetime",
//       labels: {
//         style: {
//           colors: "#FFFFFF",
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Incident Count",
//         style: {
//           color: "#FFFFFF",
//         },
//       },
//       labels: {
//         style: {
//           colors: "#FFFFFF",
//         },
//       },
//     },
//     legend: {
//       position: "top",
//       labels: {
//         colors: "#FFFFFF",
//       },
//     },
//     tooltip: {
//       theme: "dark",
//     },
//     colors: ["#007FFF", "#4CAF50", "#FFA726"],
//     title: {
//       text: "Future Projection: Incident Counts",
//       align: "center",
//       style: {
//         fontSize: "16px",
//         color: "#FFFFFF",
//       },
//     },
//     subtitle: {
//       text: "Last Week vs. Predicted Week",
//       align: "center",
//       style: {
//         fontSize: "14px",
//         color: "#AAAAAA",
//       },
//     },
//   };

//   const seriesData = [
//     {
//       name: "Actual Last Week",
//       data: [
//         { x: "2024-12-01", y: 20 },
//         { x: "2024-12-02", y: 15 },
//         { x: "2024-12-03", y: 25 },
//         { x: "2024-12-04", y: 10 },
//         { x: "2024-12-05", y: 18 },
//         { x: "2024-12-06", y: 22 },
//         { x: "2024-12-07", y: 17 },
//       ],
//     },
//     {
//       name: "Predicted Last Week",
//       data: [
//         { x: "2024-12-01", y: 12 },
//         { x: "2024-12-02", y: 14 },
//         { x: "2024-12-03", y: 15 },
//         { x: "2024-12-04", y: 8 },
//         { x: "2024-12-05", y: 16 },
//         { x: "2024-12-06", y: 20 },
//         { x: "2024-12-07", y: 13 },
//       ],
//     },
//     {
//       name: "Predicted Next Week",
//       data: [
//         { x: "2024-12-08", y: 14 },
//         { x: "2024-12-09", y: 18 },
//         { x: "2024-12-10", y: 20 },
//         { x: "2024-12-11", y: 12 },
//         { x: "2024-12-12", y: 16 },
//       ],
//     },
//   ];
//   const parseDate = (dateString) => {
//     const [day, month, year] = dateString.split("-");
//     return `${year}-${month}-${day}`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchForecastData(activeFilter);
//         console.log("response for line chart predict", response);
//         const graphData = response.data.graphs[0].figure;
//         console.log("response for line chart predict only graph", graphData);

//         const formattedData = [
//           {
//             name: "Actual 42 days",
//             data: graphData["Actual 42 days"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//           {
//             name: "Predicted 42 days",
//             data: graphData["Predicted 42 days"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//           {
//             name: "Next week projection",
//             data: graphData["Next week projection"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//         ];

//         setChartData(formattedData);
//       } catch (error) {
//         console.error("Error fetching forecast data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [activeFilter]);

//   return (
//     <Box
//       sx={{
//         width: "95%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         height: "100%",
//         padding: "5px",
//       }}
//     >
//       {isLoading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "400px",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           <select
//             value={incidentType}
//             onChange={(e) => setIncidentType(e.target.value)}
//           >
//             {incidentTypeOptions.map((item, index) => (
//               <option key={index} value={item}>
//                 {item}
//               </option>
//             ))}
//           </select>
//           <Chart
//             options={chartOptions}
//             series={chartData}
//             type="line"
//             height={400}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default LineChart;

// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import {
//   Box,
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { fetchForecastData } from "../../api/graphData";

// const LineChart = ({ activeFilter, filters, incidentTypeOptions }) => {
//   const [chartData, setChartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [incidentType, setIncidentType] = useState("");

//   const chartOptions = {
//     chart: {
//       type: "line",
//       background: "#1E1E2F",
//       toolbar: {
//         show: false,
//       },
//     },
//     theme: {
//       mode: "dark",
//     },
//     stroke: {
//       curve: "smooth",
//       width: 2,
//     },
//     markers: {
//       size: 4,
//     },
//     xaxis: {
//       type: "datetime",
//       labels: {
//         style: {
//           colors: "#FFFFFF",
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Incident Count",
//         style: {
//           color: "#FFFFFF",
//         },
//       },
//       labels: {
//         style: {
//           colors: "#FFFFFF",
//         },
//       },
//     },
//     legend: {
//       position: "top",
//       labels: {
//         colors: "#FFFFFF",
//       },
//     },
//     tooltip: {
//       theme: "dark",
//     },
//     colors: ["#007FFF", "#4CAF50", "#FFA726"],
//     title: {
//       text: "Future Projection: Incident Counts",
//       align: "center",
//       style: {
//         fontSize: "16px",
//         color: "#FFFFFF",
//       },
//     },
//     subtitle: {
//       text: "Last Week vs. Predicted Week",
//       align: "center",
//       style: {
//         fontSize: "14px",
//         color: "#AAAAAA",
//       },
//     },
//   };

//   const parseDate = (dateString) => {
//     const [day, month, year] = dateString.split("-");
//     return `${year}-${month}-${day}`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchForecastData({
//           ...activeFilter,
//           incidentType,
//         });
//         const graphData = response.data.graphs[0].figure;

//         const formattedData = [
//           {
//             name: "Actual 42 days",
//             data: graphData["Actual 42 days"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//           {
//             name: "Predicted 42 days",
//             data: graphData["Predicted 42 days"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//           {
//             name: "Next week projection",
//             data: graphData["Next week projection"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//         ];

//         setChartData(formattedData);
//       } catch (error) {
//         console.error("Error fetching forecast data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [activeFilter, incidentType]);

//   return (
//     <Box
//       sx={{
//         width: "95%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         height: "100%",
//         padding: "5px",
//         position: "relative",
//       }}
//     >
//       {isLoading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "400px",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           {/* Dropdown positioned at the top-right corner */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginBottom: "10px",
//             }}
//           >
//             <FormControl size="small" sx={{ minWidth: 200 }}>
//               <InputLabel id="incident-type-label">Incident Type</InputLabel>
//               <Select
//                 labelId="incident-type-label"
//                 value={incidentType}
//                 onChange={(e) => setIncidentType(e.target.value)}
//                 label="Incident Type"
//               >
//                 {incidentTypeOptions.map((item, index) => (
//                   <MenuItem key={index} value={item}>
//                     {item}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//           <Chart
//             options={chartOptions}
//             series={chartData}
//             type="line"
//             height={400}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default LineChart;

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
// import { fetchForecastData } from "../../api/graphData";

// const LineChart = ({ activeFilter, filters, incidentTypeOptions }) => {
//   const [chartData, setChartData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [incidentType, setIncidentType] = useState("");
//   const [timeframe, setTimeframe] = useState("daily");

//   // State for menu anchor
//   const [anchorEl, setAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);

//   const chartOptions = {
//     chart: {
//       type: "line",
//       background: "#1E1E2F",
//       toolbar: {
//         show: false,
//       },
//     },
//     theme: {
//       mode: "dark",
//     },
//     stroke: {
//       curve: "smooth",
//       width: 2,
//     },
//     markers: {
//       size: 4,
//     },
//     xaxis: {
//       type: "datetime",
//       labels: {
//         style: {
//           colors: "#FFFFFF",
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Incident Count",
//         style: {
//           color: "#FFFFFF",
//         },
//       },
//       labels: {
//         style: {
//           colors: "#FFFFFF",
//         },
//       },
//     },
//     legend: {
//       position: "top",
//       labels: {
//         colors: "#FFFFFF",
//       },
//     },
//     tooltip: {
//       theme: "dark",
//     },
//     colors: ["#007FFF", "#4CAF50", "#FFA726"],
//     title: {
//       text: "Future Projection: Incident Counts",
//       align: "center",
//       style: {
//         fontSize: "16px",
//         color: "#FFFFFF",
//       },
//     },
//     subtitle: {
//       text: "Last Week vs. Predicted Week",
//       align: "center",
//       style: {
//         fontSize: "14px",
//         color: "#AAAAAA",
//       },
//     },
//   };

//   const parseDate = (dateString) => {
//     const [day, month, year] = dateString.split("-");
//     return `${year}-${month}-${day}`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchForecastData({
//           ...activeFilter,
//           incidentType,
//           timeframe,
//         });
//         const graphData = response.data.graphs[0].figure;

//         const formattedData = [
//           {
//             name: "Actual 42 days",
//             data: graphData["Actual 42 days"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//           {
//             name: "Predicted 42 days",
//             data: graphData["Predicted 42 days"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//           {
//             name: "Next week projection",
//             data: graphData["Next week projection"].map((item) => ({
//               x: new Date(parseDate(item.date)).toISOString(),
//               y: item.count,
//             })),
//           },
//         ];

//         setChartData(formattedData);
//       } catch (error) {
//         console.error("Error fetching forecast data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [activeFilter, incidentType, timeframe]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box
//       sx={{
//         width: "95%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         height: "100%",
//         padding: "5px",
//         position: "relative",
//       }}
//     >
//       {isLoading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "400px",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           {/* Three-dot menu icon */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               marginBottom: "10px",
//             }}
//           >
//             <IconButton onClick={handleMenuOpen}>
//               <MoreVertIcon />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={isMenuOpen}
//               onClose={handleMenuClose}
//               PaperProps={{
//                 sx: {
//                   padding: "10px",
//                   // backgroundColor: "#1E1E2F",
//                   color: "#FFFFFF",
//                 },
//               }}
//             >
//               {/* Incident Type Dropdown */}
//               <FormControl size="small" sx={{ minWidth: 200, marginBottom: 2 }}>
//                 <InputLabel id="incident-type-menu-label">
//                   Incident Type
//                 </InputLabel>
//                 <Select
//                   labelId="incident-type-menu-label"
//                   value={incidentType}
//                   onChange={(e) => {
//                     setIncidentType(e.target.value);
//                   }}
//                   label="Incident Type"
//                 >
//                   {incidentTypeOptions.map((item, index) => (
//                     <MenuItem key={index} value={item}>
//                       {item}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               {/* Timeframe Dropdown */}
//               <FormControl size="small" sx={{ minWidth: 200 }}>
//                 <InputLabel id="timeframe-menu-label">Timeframe</InputLabel>
//                 <Select
//                   labelId="timeframe-menu-label"
//                   value={timeframe}
//                   onChange={(e) => {
//                     setTimeframe(e.target.value);
//                   }}
//                   label="Timeframe"
//                 >
//                   {["daily", "weekly", "monthly", "yearly"].map(
//                     (item, index) => (
//                       <MenuItem key={index} value={item}>
//                         {item.charAt(0).toUpperCase() + item.slice(1)}
//                       </MenuItem>
//                     )
//                   )}
//                 </Select>
//               </FormControl>
//             </Menu>
//           </Box>
//           <Chart
//             options={chartOptions}
//             series={chartData}
//             type="line"
//             height={400}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default LineChart;
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
    </Box>
  );
};

export default LineChart;
