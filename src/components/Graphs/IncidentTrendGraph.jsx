// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import { ChartFilters } from "../ChatFilters";
// import { Box, CircularProgress, IconButton } from "@mui/material";
// import { fetchTrendLinePlotData } from "../../api/graphData";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// const TrendGraphWithFilters = () => {
//   const [graphData, setGraphData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [filterOptions, setFilterOptions] = useState({
//     client: [],
//     site: [],
//     metroRegion: [],
//     incidentType: [],
//   });

//   const [filters, setFilters] = useState({
//     client: "",
//     site: "",
//     metroRegion: "",
//     incidentType: "",
//     timeframe: "weekly",
//   });

//   const [activeFilter, setActiveFilter] = useState({
//     client: "",
//     site: "",
//     metroRegion: "",
//     incidentType: "",
//     timeframe: "weekly",
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchTrendLinePlotData(activeFilter);
//         console.log("response for trends graph", response);

//         const aggregatedData = [];
//         if (response.data.graphs && response.data.graphs.length > 0) {
//           response.data.graphs.forEach((graph) => {
//             if (graph.figure && Array.isArray(graph.figure)) {
//               aggregatedData.push(...graph.figure);
//             }
//           });
//           if (response.data.filters) {
//             setFilterOptions({
//               client: [...new Set(response.data.filters.Client || [])],
//               site: [...new Set(response.data.filters.Site || [])],
//               metroRegion: [
//                 ...new Set(response.data.filters["Metro Region"] || []),
//               ],
//               incidentType: [
//                 ...new Set(response.data.filters["Incident Type"] || []),
//               ],
//             });
//           }
//         }
//         console.log("aggregate data from line plot", aggregatedData);
//         setGraphData(aggregatedData);
//       } catch (e) {
//         console.error("Error fetching graph data:", e);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [activeFilter]);

//     useEffect(()=>{
//       console.log("timeframe change")
//       setCurrentPage(1);
//     },[timeframe])

//   // Function to dynamically extract data based on timeframe and pagination
//   const processDataForGraph = () => {
//     const timeframeData = graphData.filter((data) => {
//       if (timeframe === "daily" && data.Date) return true;
//       if (timeframe === "weekly" && data.Week) return true;
//       if (timeframe === "monthly" && data.Month) return true;
//       if (timeframe === "yearly" && data.Year) return true;
//       return false;
//     });

//     // Apply pagination by slicing data
//     const startIndex = (currentPage - 1) * pageSize;
//     const paginatedData = timeframeData.slice(startIndex, startIndex + pageSize);

//     const categories = paginatedData.map((data) =>
//       timeframe === "daily"
//         ? data.Date
//         : timeframe === "weekly"
//         ? data.Week
//         : timeframe === "monthly"
//         ? data.Month
//         : data.Year
//     );

//     const series = [
//       {
//         name: `${
//           timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
//         } Trend`,
//         data: paginatedData.map((data) => data.Count),
//       },
//     ];

//     return { categories, series };
//   };

//   const { categories, series } = processDataForGraph();

//   const options = {
//     chart: {
//       type: "line",
//       toolbar: { show: false },
//       zoom: { enabled: false },
//     },
//     xaxis: {
//       categories: categories,
//       title: {
//         text:
//           timeframe === "daily"
//             ? "Days"
//             : timeframe === "weekly"
//             ? "Weeks"
//             : timeframe === "monthly"
//             ? "Months"
//             : "Years",
//       },
//     },
//     yaxis: {
//       title: { text: "Number of Incidents" },
//     },
//     stroke: { curve: "straight" },
//     markers: { size: 5 },
//     title: {
//       text: `Trend analysis of incident occurrences (${
//         timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
//       })`,
//       align: "center",
//     },
//     legend: {
//       position: "top",
//       horizontalAlign: "center",
//     },
//   };

//   const handleApplyFilters = async () => {
//     setActiveFilter(filters);
//     setCurrentPage(1); // Reset to first page when filters change
//   };

//   // Handle pagination navigation
//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(graphData.length / pageSize)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: "95%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         height: "92.5%",
//         padding: "5px",
//       }}
//     >
//       <ChartFilters
//         filters={filters}
//         onFiltersChange={setFilters}
//         onApplyFilters={handleApplyFilters}
//         showTimeFrame={true}
//         filterOptions={filterOptions}
//         isDaily={true}
//       />
//       {isLoading ? (
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//          <Box sx={{ position: "relative", width: "100%" }}>
//         <IconButton
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             sx={{
//               position: "absolute",
//               left: "-10px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               zIndex: 1,
//               color: "black",
//             }}
//           >
//             <KeyboardArrowLeftIcon fontSize="large" />
//           </IconButton>

//           <ReactApexChart
//             options={options}
//             series={series}
//             type="line"
//             height={300}
//           />

//         <IconButton
//             onClick={handleNextPage}
//             disabled={currentPage === Math.ceil(graphData.length / pageSize) - 1}
//             sx={{
//               position: "absolute",
//               right: "-30px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               zIndex: 1,
//               color: "black",
//             }}
//           >
//             <KeyboardArrowRightIcon fontSize="large" />
//           </IconButton>

//           </Box>
//       )}
//     </Box>
//   );
// };

// export default TrendGraphWithFilters;
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
} from "@mui/material";
import { fetchTrendLinePlotData } from "../../api/graphData";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
        </>
      )}
    </Box>
  );
};

export default TrendGraphWithFilters;
