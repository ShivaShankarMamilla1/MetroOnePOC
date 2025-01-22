// // import React, { useState, useEffect } from "react";
// // import Chart from "react-apexcharts";
// // import {
// //   Box,
// //   IconButton,
// //   Typography,
// //   Stack,
// //   CircularProgress,
// // } from "@mui/material";
// // import { ChartFilters } from "../ChatFilters";
// // import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

// // const Heatmap = () => {
// //   const [graphData, setGraphData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [filters, setFilters] = useState({
// //     client: "",
// //     site: "",
// //     metroRegion: "",
// //     incidentType: "",
// //     timeframe: "weekly",
// //   });
// //   // Separate state for active filters that will trigger the API call
// //   const [activeFilter, setActiveFilter] = useState({
// //     client: "",
// //     site: "",
// //     metroRegion: "",
// //     incidentType: "",
// //     timeframe: "weekly",
// //   });
// //   // State for temporary filters that update on change but don't trigger API
// //   const [tempFilters, setTempFilters] = useState({
// //     client: "",
// //     site: "",
// //     metroRegion: "",
// //     incidentType: "",
// //     timeframe: "weekly",
// //   });
// //   useEffect(() => {
// //     const getData = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await fetchIncidentDistributionHeatMap(activeFilter);
// //         console.log("response from last heat map", response);
// //         setFilters((prevFilters) => ({
// //           ...prevFilters,
// //           client: response.data.filters.Client || "",
// //           site: response.data.filters.Site || "",
// //           metroRegion: response.data.filters["Metro Region"] || "",
// //           incidentType: response.data.filters["Incident Type"] || "",
// //           timeframe: "weekly",
// //         }));
// //         const aggregatedData = [];
// //         if (response.data.graphs && response.data.graphs.length > 0) {
// //           response.data.graphs.forEach((graph) => {
// //             if (graph.figure && Array.isArray(graph.figure)) {
// //               aggregatedData.push(...graph.figure);
// //             }
// //           });
// //         }
// //         console.log("aggregate data from last heat map", aggregatedData);
// //         setGraphData(aggregatedData);
// //       } catch (e) {
// //         console.error(e);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     getData();
// //   }, [activeFilter]);

// //   // Sample data generator (Replace with actual data)
// //   const generateData = (categories, seriesLength) => {
// //     return categories.map((category) => ({
// //       name: category,
// //       data: Array.from({ length: seriesLength }, () =>
// //         Math.floor(Math.random() * 100)
// //       ),
// //     }));
// //   };

// //   // Heatmap data for each filters.timeframe.timeframe
// //   const heatmapData = {
// //     weekly: {
// //       categories: [
// //         "Monday",
// //         "Tuesday",
// //         "Wednesday",
// //         "Thursday",
// //         "Friday",
// //         "Saturday",
// //         "Sunday",
// //       ],
// //       series: generateData(["00:00", "06:00", "12:00", "18:00"], 7),
// //     },
// //     monthly: {
// //       categories: [
// //         "January",
// //         "February",
// //         "March",
// //         "April",
// //         "May",
// //         "June",
// //         "July",
// //         "August",
// //         "September",
// //         "October",
// //         "November",
// //         "December",
// //       ],
// //       series: generateData(["00:00", "06:00", "12:00", "18:00"], 12),
// //     },
// //     yearly: {
// //       categories: ["2021", "2022", "2023", "2024"],
// //       series: generateData(["00:00", "06:00", "12:00", "18:00"], 4),
// //     },
// //   };

// //   const chartOptions = {
// //     chart: {
// //       type: "heatmap",
// //       toolbar: {
// //         show: false,
// //       },
// //     },
// //     dataLabels: {
// //       enabled: false,
// //     },
// //     title: {
// //       text: "Hourly Incident Counts",
// //       align: "center",
// //     },
// //     colors: ["#008FFB"],
// //     xaxis: {
// //       categories: heatmapData[filters.timeframe].categories,
// //     },
// //     plotOptions: {
// //       heatmap: {
// //         shadeIntensity: 0.5,
// //         colorScale: {
// //           ranges: [
// //             { from: 0, to: 20, color: "#E3F2FD" },
// //             { from: 21, to: 50, color: "#90CAF9" },
// //             { from: 51, to: 75, color: "#42A5F5" },
// //             { from: 76, to: 100, color: "#1565C0" },
// //           ],
// //         },
// //       },
// //     },
// //   };

// //   const handleApplyFilters = async () => {
// //     // Here you would make your API call with the selected filters
// //     // Example:
// //     // const response = await fetch('/api/trend-data', {
// //     //   method: 'POST',
// //     //   body: JSON.stringify({
// //     //     client: selectedClient,
// //     //     site: selectedSite,
// //     //     region: selectedRegion,
// //     //     incidentType: selectedIncidentType,
// //     //     timeframe: selectedFilter
// //     //   })
// //     // });
// //     // const newData = await response.json();
// //     // Update your chart data here
// //     // setIsDrawerOpen(false);
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         width: "95%",
// //         display: "flex",
// //         flexDirection: "column",
// //         justifyContent: "center",
// //         height: "100%",
// //         padding: "5px",
// //       }}
// //     >
// //       <ChartFilters
// //         filters={filters}
// //         onFiltersChange={setFilters}
// //         onApplyFilters={handleApplyFilters}
// //       />
// //       {/* Heatmap Chart */}
// //       <Chart
// //         options={chartOptions}
// //         series={heatmapData[filters.timeframe].series}
// //         type="heatmap"
// //         height={380}
// //       />
// //     </Box>
// //   );
// // };

// // export default Heatmap;
// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import {
//   Box,
//   IconButton,
//   Typography,
//   Stack,
//   CircularProgress,
// } from "@mui/material";
// import { ChartFilters } from "../ChatFilters";
// import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

// const Heatmap = () => {
//   const [graphData, setGraphData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [filters, setFilters] = useState({
//     client: "",
//     site: "",
//     metroRegion: "",
//     incidentType: "",
//     timeframe: "weekly",
//   });

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchIncidentDistributionHeatMap(filters);
//         setFilters((prevFilters) => ({
//           ...prevFilters,
//           client: response.data.filters.Client || "",
//           site: response.data.filters.Site || "",
//           metroRegion: response.data.filters["Metro Region"] || "",
//           incidentType: response.data.filters["Incident Type"] || "",
//           timeframe: "weekly",
//         }));

//         // Get the appropriate data based on timeframe
//         const timeframeIndex =
//           filters.timeframe === "weekly"
//             ? 0
//             : filters.timeframe === "monthly"
//             ? 1
//             : 2;
//         const data = response.data.graphs[timeframeIndex].figure;

//         // Transform data for ApexCharts format
//         if (filters.timeframe === "weekly") {
//           const series = data.Hours.map((hour, idx) => ({
//             name: `${hour}:00`,
//             data: data.Count.map((dayData) => dayData[idx]),
//           }));
//           setGraphData(series);
//         } else if (filters.timeframe === "monthly") {
//           const series = data.Weekdays.map((day, idx) => ({
//             name: day,
//             data: data.Count.map((monthData) => monthData[idx]),
//           }));
//           setGraphData(series);
//         } else {
//           // Yearly data
//           const series = data.Years.map((year, idx) => ({
//             name: year.toString(),
//             data: data.Count[idx],
//           }));
//           setGraphData(series);
//         }
//       } catch (error) {
//         console.error("Error fetching heatmap data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [filters]);

//   const getCategories = () => {
//     switch (filters.timeframe) {
//       case "weekly":
//         return [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ];
//       case "monthly":
//         return [
//           "January",
//           "February",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//           "August",
//           "September",
//           "October",
//           "November",
//           "December",
//         ];
//       case "yearly":
//         return [
//           "January",
//           "February",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//           "August",
//           "September",
//           "October",
//           "November",
//           "December",
//         ];
//       default:
//         return [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ];
//     }
//   };

//   const chartOptions = {
//     chart: {
//       type: "heatmap",
//       toolbar: {
//         show: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     title: {
//       text: "Hourly Incident Counts",
//       align: "center",
//     },
//     colors: ["#008FFB"],
//     xaxis: {
//       categories: getCategories(),
//     },
//     plotOptions: {
//       heatmap: {
//         shadeIntensity: 0.5,
//         colorScale: {
//           ranges: [
//             { from: 0, to: 100, color: "#E3F2FD" },
//             { from: 101, to: 300, color: "#90CAF9" },
//             { from: 301, to: 600, color: "#42A5F5" },
//             { from: 601, to: 1000, color: "#1565C0" },
//           ],
//         },
//       },
//     },
//   };

//   const handleApplyFilters = async (newFilters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <Box sx={{ width: "95%", height: "100%", padding: "5px" }}>
//       <ChartFilters
//         filters={filters}
//         onFiltersChange={setFilters}
//         onApplyFilters={handleApplyFilters}
//         filterOptions={{
//           client: ["Client_2", "Client_3", "Client_5"],
//           site: ["Site_341", "Site_298", "Site_158"], // Truncated for brevity
//           metroRegion: [
//             "Central North",
//             "Central South",
//             "Northeast",
//             "Southeast",
//             "West",
//           ],
//           incidentType: [
//             "Verbal Altercation / Assault",
//             "Missing Property",
//             "Vandalism",
//           ], // Truncated for brevity
//         }}
//         showTimeFrame={true}
//       />

//       {isLoading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Chart
//           options={chartOptions}
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
  IconButton,
  CircularProgress,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ChartFilters } from "../ChatFilters"; // Import the global ChartFilters
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CloseIcon from "@mui/icons-material/Close";
import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

const Heatmap = () => {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    client: "",
    site: "",
    metroRegion: "",
    incidentType: "",
    timeframe: "weekly",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchIncidentDistributionHeatMap(filters);
        setFilters((prevFilters) => ({
          ...prevFilters,
          client: response.data.filters.Client || "",
          site: response.data.filters.Site || "",
          metroRegion: response.data.filters["Metro Region"] || "",
          incidentType: response.data.filters["Incident Type"] || "",
          timeframe: "weekly",
        }));

        // Get the appropriate data based on timeframe
        const timeframeIndex =
          filters.timeframe === "weekly"
            ? 0
            : filters.timeframe === "monthly"
            ? 1
            : 2;
        const data = response.data.graphs[timeframeIndex].figure;

        // Transform data for ApexCharts format
        if (filters.timeframe === "weekly") {
          const series = data.Hours.map((hour, idx) => ({
            name: `${hour}:00`,
            data: data.Count.map((dayData) => dayData[idx]),
          }));
          setGraphData(series);
        } else if (filters.timeframe === "monthly") {
          const series = data.Weekdays.map((day, idx) => ({
            name: day,
            data: data.Count.map((monthData) => monthData[idx]),
          }));
          setGraphData(series);
        } else {
          // Yearly data
          const series = data.Years.map((year, idx) => ({
            name: year.toString(),
            data: data.Count[idx],
          }));
          setGraphData(series);
        }
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [filters]);

  const getCategories = () => {
    switch (filters.timeframe) {
      case "weekly":
        return [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
      case "monthly":
        return [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      case "yearly":
        return [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      default:
        return [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
    }
  };

  const chartOptions = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Hourly Incident Counts",
      align: "center",
    },
    colors: ["#008FFB"],
    xaxis: {
      categories: getCategories(),
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
  };

  const handleApplyFilters = async (newFilters) => {
    setFilters(newFilters);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box sx={{ width: "95%", height: "100%", padding: "5px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Side: Menu (ChartFilters) */}
        <Box sx={{ flex: 1 }}>
          <ChartFilters
            filters={filters}
            onFiltersChange={setFilters}
            onApplyFilters={handleApplyFilters}
            filterOptions={{
              client: ["Client_2", "Client_3", "Client_5"],
              site: ["Site_341", "Site_298", "Site_158"], // Truncated for brevity
              metroRegion: [
                "Central North",
                "Central South",
                "Northeast",
                "Southeast",
                "West",
              ],
              incidentType: [
                "Verbal Altercation / Assault",
                "Missing Property",
                "Vandalism",
              ], // Truncated for brevity
            }}
            showTimeFrame={false} // Hide timeframe in the left filters
          />
        </Box>

        {/* Right Side: Timeframe Dropdown and Expand Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl variant="outlined" size="small">
            <InputLabel>Timeframe</InputLabel>
            <Select
              value={filters.timeframe}
              onChange={(e) =>
                setFilters({ ...filters, timeframe: e.target.value })
              }
              label="Timeframe"
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={toggleModal}>
            {isModalOpen ? <CloseIcon /> : <AspectRatioIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Loading spinner */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Chart
          options={chartOptions}
          series={graphData}
          type="heatmap"
          height={380}
        />
      )}

      {/* Modal for expanded view */}
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
            options={chartOptions}
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
