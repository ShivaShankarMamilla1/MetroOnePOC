// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import { ChartFilters } from "../ChatFilters";
// import { Box, CircularProgress } from "@mui/material";
// import { fetchTrendLinePlotData } from "../../api/graphData";

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
//   const data = {
//     daily: {
//       categories: [
//         "2025-01-01",
//         "2025-01-02",
//         "2025-01-03",
//         "2025-01-04",
//         "2025-01-05",
//         "2025-01-06",
//         "2025-01-07",
//       ],
//       series: [
//         {
//           name: "Daily Trend",
//           data: [120, 150, 130, 170, 160, 140, 180],
//         },
//       ],
//       color: ["#00FF00"],
//     },
//     weekly: {
//       categories: [
//         "Week 1",
//         "Week 2",
//         "Week 3",
//         "Week 4",
//         "Week 5",
//         "Week 6",
//         "Week 7",
//       ],
//       series: [
//         {
//           name: "Moving Average",
//           data: [110, 145, 125, 165, 150, 135, 175],
//         },
//       ],
//       color: ["#FFD700"],
//     },
//     monthly: {
//       categories: [
//         "Jan 2024",
//         "Feb 2024",
//         "Mar 2024",
//         "Apr 2024",
//         "May 2024",
//         "Jun 2024",
//         "Jul 2024",
//       ],
//       series: [
//         {
//           name: "Monthly Trend",
//           data: [400, 450, 500, 550, 600, 650, 700],
//         },
//       ],
//       color: ["#800080"],
//     },
//     yearly: {
//       categories: ["2021", "2022", "2023", "2024", "2025"],
//       series: [
//         {
//           name: "Yearly Trend",
//           data: [1000, 2000, 3000, 4000, 5000],
//         },
//       ],
//       color: ["#FFA500"],
//     },
//   };

//   const handleApplyFilters = async () => {
//     setActiveFilter(filters);
//   };

//   const options = {
//     chart: {
//       type: "line",
//       toolbar: { show: false },
//       zoom: { enabled: false },
//     },
//     xaxis: {
//       categories: data[filters.timeframe].categories,
//       title: {
//         text:
//           filters.timeframe === "daily"
//             ? "Days"
//             : filters.timeframe === "weekly"
//             ? "Weeks"
//             : filters.timeframe === "monthly"
//             ? "Months"
//             : "Years",
//       },
//     },
//     yaxis: {
//       title: { text: "Number of Incidents" },
//     },
//     stroke: { curve: "straight" },
//     markers: { size: 5 },
//     colors: data[filters.timeframe].color,
//     title: {
//       text: `Trend analysis of incident occurrences (${
//         filters.timeframe.charAt(0).toUpperCase() + filters.timeframe.slice(1)
//       })`,
//       align: "center",
//     },
//     legend: {
//       position: "top",
//       horizontalAlign: "center",
//     },
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
//       />
//       <ReactApexChart
//         options={options}
//         series={data[filters.timeframe].series}
//         type="line"
//         height={300}
//       />
//     </Box>
//   );
// };

// export default TrendGraphWithFilters;
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartFilters } from "../ChatFilters";
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import OpenInFullIcon from "@mui/icons-material/OpenInFull"; // Expand icon
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen"; // Minimize icon
import { fetchTrendLinePlotData } from "../../api/graphData";

const TrendGraphWithFilters = () => {
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

  const [activeFilter, setActiveFilter] = useState({
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
        const response = await fetchTrendLinePlotData(activeFilter);
        console.log("response for trends graph", response);

        const aggregatedData = [];
        if (response.data.graphs && response.data.graphs.length > 0) {
          response.data.graphs.forEach((graph) => {
            if (graph.figure && Array.isArray(graph.figure)) {
              aggregatedData.push(...graph.figure);
            }
          });
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
        }
        console.log("aggregate data from line plot", aggregatedData);
        setGraphData(aggregatedData);
      } catch (e) {
        console.error("Error fetching graph data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter]);

  const processDataForGraph = () => {
    const timeframeData = graphData.filter((data) => {
      if (filters.timeframe === "daily" && data.Date) return true;
      if (filters.timeframe === "weekly" && data.Week) return true;
      if (filters.timeframe === "monthly" && data.Month) return true;
      if (filters.timeframe === "yearly" && data.Year) return true;
      return false;
    });

    const categories = timeframeData.map((data) =>
      filters.timeframe === "daily"
        ? data.Date
        : filters.timeframe === "weekly"
        ? data.Week
        : filters.timeframe === "monthly"
        ? data.Month
        : data.Year
    );

    const series = [
      {
        name: `${
          filters.timeframe.charAt(0).toUpperCase() + filters.timeframe.slice(1)
        } Trend`,
        data: timeframeData.map((data) => data.Count),
      },
    ];

    return { categories, series };
  };

  const { categories, series } = processDataForGraph();

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: categories,
      title: {
        text:
          filters.timeframe === "daily"
            ? "Days"
            : filters.timeframe === "weekly"
            ? "Weeks"
            : filters.timeframe === "monthly"
            ? "Months"
            : "Years",
      },
    },
    yaxis: {
      title: { text: "Number of Incidents" },
    },
    stroke: { curve: "straight" },
    markers: { size: 5 },
    title: {
      text: `Trend analysis of incident occurrences (${
        filters.timeframe.charAt(0).toUpperCase() + filters.timeframe.slice(1)
      })`,
      align: "center",
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  const handleApplyFilters = async () => {
    setActiveFilter(filters);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "count", headerName: "Count", flex: 1 },
  ];

  const rows = graphData.map((data, index) => ({
    id: index,
    date: data.Date || data.Week || data.Month || data.Year,
    count: data.Count,
  }));

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ChartFilters
          filters={filters}
          onFiltersChange={setFilters}
          onApplyFilters={handleApplyFilters}
          showTimeFrame={true}
          filterOptions={filterOptions}
          isDaily={true}
        />
        <IconButton onClick={toggleModal}>
          {isModalOpen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
        </IconButton>
      </Box>

      {/* Loading spinner */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
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
            display: "flex",
            gap: 2,
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
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)", // Reduce hover background
              },
            }}
          >
            <CloseFullscreenIcon />
          </IconButton>

          {/* Left side: Graph */}
          <Box sx={{ flex: 1 }}>
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={550}
            />
          </Box>

          {/* Right side: DataGrid */}
          <Box
            sx={{
              flex: 1,
              height: "100%",
              overflow: "auto", // Make the container scrollable
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={rows.length} // Set pageSize to the total number of rows
              rowsPerPageOptions={[]} // Hide pagination controls
              hideFooter // Hide the entire footer (including pagination space)
              autoHeight={false} // Disable autoHeight to make it scrollable
              sx={{ height: "100%" }} // Set height to 100% of the parent container
              disableSelectionOnClick // Disable row selection on click
              disableColumnMenu // Disable column menu
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TrendGraphWithFilters;
