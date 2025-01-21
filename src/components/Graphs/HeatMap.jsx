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
// //   });

// //   useEffect(() => {
// //     const getData = async () => {
// //       try {
// //         setIsLoading(true);
// //         const response = await fetchIncidentDistributionHeatMap(activeFilter);
// //         setFilters((prevFilters) => ({
// //           ...prevFilters,
// //           client: response.data.filters.Client || "",
// //           site: response.data.filters.Site || "",
// //           metroRegion: response.data.filters["Metro Region"] || "",
// //           incidentType: response.data.filters["Incident Type"] || "",
// //           timeframe: "weekly",
// //         }));

// //         // Get the appropriate data based on timeframe
// //         const timeframeIndex =
// //           filters.timeframe === "weekly"
// //             ? 0
// //             : filters.timeframe === "monthly"
// //             ? 1
// //             : 2;
// //         const data = response.data.graphs[timeframeIndex].figure;

// //         // Transform data for ApexCharts format
// //         if (filters.timeframe === "weekly") {
// //           const series = data.Hours.map((hour, idx) => ({
// //             name: `${hour}:00`,
// //             data: data.Count.map((dayData) => dayData[idx]),
// //           }));
// //           setGraphData(series);
// //         } else if (filters.timeframe === "monthly") {
// //           const series = data.Weekdays.map((day, idx) => ({
// //             name: day,
// //             data: data.Count.map((monthData) => monthData[idx]),
// //           }));
// //           setGraphData(series);
// //         } else {
// //           // Yearly data
// //           const series = data.Years.map((year, idx) => ({
// //             name: year.toString(),
// //             data: data.Count[idx],
// //           }));
// //           setGraphData(series);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching heatmap data:", error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     getData();
// //   }, [activeFilter]);

// //   const getCategories = () => {
// //     switch (filters.timeframe) {
// //       case "weekly":
// //         return [
// //           "Monday",
// //           "Tuesday",
// //           "Wednesday",
// //           "Thursday",
// //           "Friday",
// //           "Saturday",
// //           "Sunday",
// //         ];
// //       case "monthly":
// //         return [
// //           "January",
// //           "February",
// //           "March",
// //           "April",
// //           "May",
// //           "June",
// //           "July",
// //           "August",
// //           "September",
// //           "October",
// //           "November",
// //           "December",
// //         ];
// //       case "yearly":
// //         return [
// //           "January",
// //           "February",
// //           "March",
// //           "April",
// //           "May",
// //           "June",
// //           "July",
// //           "August",
// //           "September",
// //           "October",
// //           "November",
// //           "December",
// //         ];
// //       default:
// //         return [
// //           "Monday",
// //           "Tuesday",
// //           "Wednesday",
// //           "Thursday",
// //           "Friday",
// //           "Saturday",
// //           "Sunday",
// //         ];
// //     }
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
// //       categories: getCategories(),
// //     },
// //     plotOptions: {
// //       heatmap: {
// //         shadeIntensity: 0.5,
// //         colorScale: {
// //           ranges: [
// //             { from: 0, to: 100, color: "#E3F2FD" },
// //             { from: 101, to: 300, color: "#90CAF9" },
// //             { from: 301, to: 600, color: "#42A5F5" },
// //             { from: 601, to: 1000, color: "#1565C0" },
// //           ],
// //         },
// //       },
// //     },
// //   };

// //   const handleApplyFilters = async (newFilters) => {
// //     setActiveFilter(tempFilters);
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
// //         filters={tempFilters}
// //         onFiltersChange={setTempFilters}
// //         onApplyFilters={handleApplyFilters}
// //         filterOptions={filters}
// //         showTimeFrame={true}
// //       />

// //       {isLoading ? (
// //         <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
// //           <CircularProgress />
// //         </Box>
// //       ) : (
// //         <Chart
// //           options={chartOptions}
// //           series={graphData}
// //           type="heatmap"
// //           height={380}
// //         />
// //       )}
// //     </Box>
// //   );
// // };

// // export default Heatmap;
// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import { Box, CircularProgress } from "@mui/material";
// import { ChartFilters } from "../ChatFilters";
// import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

// const Heatmap = () => {
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

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchIncidentDistributionHeatMap(activeFilter);

//         if (response.data.filters) {
//           setFilterOptions({
//             client: [...new Set(response.data.filters.Client || [])],
//             site: [...new Set(response.data.filters.Site || [])],
//             metroRegion: [
//               ...new Set(response.data.filters["Metro Region"] || []),
//             ],
//             incidentType: [
//               ...new Set(response.data.filters["Incident Type"] || []),
//             ],
//             timeframe: "weekly",
//           });
//         }

//         const data = response.data.graphs[0].figure; // Get the base figure data
//         const processedData = processHeatmapData(data, activeFilter.timeframe);
//         setGraphData(processedData);
//       } catch (error) {
//         console.error("Error fetching heatmap data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [activeFilter]);

//   const processHeatmapData = (data, timeframe) => {
//     switch (timeframe) {
//       case "daily":
//         return data.Hours.map((hour, idx) => ({
//           name: `${hour}:00`,
//           data: data.Count.map((dayData) => dayData[idx]),
//         }));
//       case "weekly":
//         return data.Hours.map((hour, idx) => ({
//           name: `${hour}:00`,
//           data: data.Count.map((dayData) => dayData[idx]),
//         }));
//       case "monthly":
//         return data.Weekdays.map((day, idx) => ({
//           name: day,
//           data: data.Count.map((monthData) => monthData[idx]),
//         }));
//       case "yearly":
//         return data.Months.map((month, idx) => ({
//           name: month,
//           data: data.Count.map((yearData) => yearData[idx]),
//         }));
//       default:
//         return [];
//     }
//   };

//   const getCategories = () => {
//     switch (activeFilter.timeframe) {
//       case "daily":
//         return Array.from({ length: 24 }, (_, i) => `${i}:00`);
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
//         return Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`);
//       case "yearly":
//         return [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
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

//   const getChartTitle = () => {
//     switch (activeFilter.timeframe) {
//       case "daily":
//         return "Hourly Incident Distribution (24-hour period)";
//       case "weekly":
//         return "Weekly Incident Distribution by Hour";
//       case "monthly":
//         return "Monthly Incident Distribution by Day";
//       case "yearly":
//         return "Yearly Incident Distribution by Month";
//       default:
//         return "Incident Distribution";
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
//       text: getChartTitle(),
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

//   const handleApplyFilters = () => {
//     setActiveFilter(filters);
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

// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import { Box, CircularProgress } from "@mui/material";
// import { ChartFilters } from "../ChatFilters";
// import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

// const Heatmap = () => {
//   const [graphData, setGraphData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [filterOptions, setFilterOptions] = useState({
//     client: [],
//     site: [],
//     metroRegion: [],
//     incidentType: [],
//   });

//   // Separate state for timeframe to ensure updates are captured
//   const [timeframe, setTimeframe] = useState("weekly");

//   const [filters, setFilters] = useState({
//     client: "",
//     site: "",
//     metroRegion: "",
//     incidentType: "",
//     timeframe: "weekly",
//   });

//   // Remove activeFilter state and use filters directly
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         console.log("Fetching data with filters:", filters); // Debug log

//         const response = await fetchIncidentDistributionHeatMap(filters);
//         console.log("Received response:", response); // Debug log

//         if (response.data.filters) {
//           setFilterOptions({
//             client: [...new Set(response.data.filters.Client || [])],
//             site: [...new Set(response.data.filters.Site || [])],
//             metroRegion: [
//               ...new Set(response.data.filters["Metro Region"] || []),
//             ],
//             incidentType: [
//               ...new Set(response.data.filters["Incident Type"] || []),
//             ],
//           });
//         }

//         const data = response.data.graphs[0].figure;
//         console.log("Processing data for timeframe:", filters.timeframe); // Debug log
//         const processedData = processHeatmapData(data, filters.timeframe);
//         console.log("Processed data:", processedData); // Debug log
//         setGraphData(processedData);
//       } catch (error) {
//         console.error("Error fetching heatmap data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [filters]); // Change dependency to filters

//   const processHeatmapData = (data, timeframe) => {
//     console.log("Raw data:", data); // Debug log
//     console.log("Current timeframe:", timeframe); // Debug log

//     if (!data || !data.Count) {
//       console.warn("Invalid data structure received");
//       return [];
//     }

//     try {
//       switch (timeframe) {
//         case "daily":
//           return Array.from({ length: 24 }, (_, hourIndex) => ({
//             name: `${hourIndex}:00`,
//             data: [data.Count[hourIndex] || 0],
//           }));

//         case "weekly":
//           return Array.from({ length: 24 }, (_, hourIndex) => ({
//             name: `${hourIndex}:00`,
//             data: Array.from(
//               { length: 7 },
//               (_, dayIndex) => data.Count[dayIndex]?.[hourIndex] || 0
//             ),
//           }));

//         case "monthly":
//           return Array.from({ length: 7 }, (_, dayIndex) => ({
//             name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex],
//             data: Array.from(
//               { length: 31 },
//               (_, dateIndex) => data.Count[dateIndex]?.[dayIndex] || 0
//             ),
//           }));

//         case "yearly":
//           return Array.from({ length: 12 }, (_, monthIndex) => ({
//             name: [
//               "Jan",
//               "Feb",
//               "Mar",
//               "Apr",
//               "May",
//               "Jun",
//               "Jul",
//               "Aug",
//               "Sep",
//               "Oct",
//               "Nov",
//               "Dec",
//             ][monthIndex],
//             data: [data.Count[monthIndex] || 0],
//           }));

//         default:
//           console.warn("Invalid timeframe:", timeframe);
//           return [];
//       }
//     } catch (error) {
//       console.error("Error processing data:", error);
//       return [];
//     }
//   };

//   const getChartOptions = () => {
//     const categories = {
//       daily: Array.from({ length: 1 }, () => "Today"),
//       weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       monthly: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
//       yearly: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//     };

//     return {
//       chart: {
//         type: "heatmap",
//         toolbar: { show: false },
//         events: {
//           mounted: (chart) => {
//             console.log("Chart mounted with options:", chart.config); // Debug log
//           },
//         },
//       },
//       dataLabels: { enabled: true },
//       title: {
//         text: `Incident Distribution (${filters.timeframe})`,
//         align: "center",
//       },
//       xaxis: {
//         categories: categories[filters.timeframe] || categories.weekly,
//       },
//       plotOptions: {
//         heatmap: {
//           shadeIntensity: 0.5,
//           colorScale: {
//             ranges: [
//               { from: 0, to: 100, color: "#E3F2FD" },
//               { from: 101, to: 300, color: "#90CAF9" },
//               { from: 301, to: 600, color: "#42A5F5" },
//               { from: 601, to: 1000, color: "#1565C0" },
//             ],
//           },
//         },
//       },
//     };
//   };

//   // Direct filter handling without separate apply step
//   const handleFilterChange = (newFilters) => {
//     console.log("Filter changed:", newFilters); // Debug log
//     setFilters(newFilters);
//   };

//   return (
//     <Box sx={{ width: "95%", height: "100%", padding: "5px" }}>
//       <ChartFilters
//         filters={filters}
//         onFiltersChange={handleFilterChange}
//         showTimeFrame={true}
//         filterOptions={filterOptions}
//         isDaily={true}
//       />

//       {isLoading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
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
import { Box, CircularProgress } from "@mui/material";
import { ChartFilters } from "../ChatFilters";
import { fetchIncidentDistributionHeatMap } from "../../api/graphData";

const Heatmap = () => {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    client: [],
    site: [],
    metroRegion: [],
    incidentType: [],
  });

  const [filters, setFilters] = useState({
    client: "",
    site: "",
    metroRegion: "",
    incidentType: "",
    timeframe: "weekly",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchIncidentDistributionHeatMap(filters);

        if (response.data.filters) {
          setFilterOptions({
            client: [...new Set(response.data.filters.Client || [])],
            site: [...new Set(response.data.filters.Site || [])],
            metroRegion: [
              ...new Set(response.data.filters["Metro Region"] || []),
            ],
            incidentType: [
              ...new Set(response.data.filters["Incident Type"] || []),
            ],
          });
        }

        // Find the correct graph data based on timeframe
        const graphIndex =
          {
            weekly: 0,
            monthly: 1,
            yearly: 2,
          }[filters.timeframe] || 0;

        const data = response.data.graphs[graphIndex].figure;
        const processedData = processHeatmapData(data, filters.timeframe);
        setGraphData(processedData);
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [filters]);

  const processHeatmapData = (data, timeframe) => {
    if (!data || !data.Count) return [];

    switch (timeframe) {
      case "daily":
        // For daily view, transform the first row of weekly data
        return data.Hours.map((hour, idx) => ({
          name: `${hour}:00`,
          data: [data.Count[0][idx]], // Use first day's data
        }));

      case "weekly":
        // Transform hours vs days data
        return data.Hours.map((hour, hourIdx) => ({
          name: `${hour}:00`,
          data: data.Count.map((dayData) => dayData[hourIdx]),
        }));

      case "monthly":
        // Transform weekdays vs months data
        return data.Weekdays.map((day, dayIdx) => ({
          name: day,
          data: data.Count.map((monthData) => monthData[dayIdx]),
        }));

      case "yearly":
        // Transform months vs years data
        return data.Months.map((month, monthIdx) => ({
          name: month,
          data: data.Count.map((yearData) => yearData[monthIdx]),
        }));

      default:
        return [];
    }
  };

  const getChartOptions = () => {
    const categories = {
      daily: ["Today"],
      weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      monthly: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
      yearly: ["2020", "2021", "2022", "2023", "2024", "2025"],
    };

    const titles = {
      daily: "Daily Incident Distribution (24-hour period)",
      weekly: "Weekly Incident Distribution by Hour",
      monthly: "Monthly Incident Distribution by Day",
      yearly: "Yearly Incident Distribution by Month",
    };

    return {
      chart: {
        type: "heatmap",
        toolbar: { show: false },
      },
      dataLabels: { enabled: true },
      title: {
        text: titles[filters.timeframe] || "Incident Distribution",
        align: "center",
      },
      xaxis: {
        categories: categories[filters.timeframe] || categories.weekly,
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              { from: 0, to: 100, color: "#E3F2FD" },
              { from: 101, to: 300, color: "#90CAF9" },
              { from: 301, to: 600, color: "#42A5F5" },
              { from: 601, to: 1000, color: "#1565C0" },
            ],
          },
        },
      },
    };
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <Box sx={{ width: "95%", height: "100%", padding: "5px" }}>
      <ChartFilters
        filters={filters}
        onFiltersChange={handleFilterChange}
        showTimeFrame={true}
        filterOptions={filterOptions}
        isDaily={true}
      />

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Chart
          options={getChartOptions()}
          series={graphData}
          type="heatmap"
          height={380}
        />
      )}
    </Box>
  );
};

export default Heatmap;
