// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import { ChartFilters } from "../ChatFilters";
// import { Box, CircularProgress } from "@mui/material";
// import { fetchTimeIncidentsHistogramData } from "../../api/graphData";

// const HistoricIncidentsChart = () => {
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

//   // Initial data fetch to get filter options
//   // useEffect(() => {
//   //   const getInitialData = async () => {
//   //     try {
//   //       setIsLoading(true);
//   //       const response = await fetchTimeIncidentsHistogramData({});

//   //       // Extract unique values for each filter from the response
//   //       if (response.data.filters) {
//   //         setFilterOptions({
//   //           client: [...new Set(response.data.filters.Client || [])],
//   //           site: [...new Set(response.data.filters.Site || [])],
//   //           metroRegion: [
//   //             ...new Set(response.data.filters["Metro Region"] || []),
//   //           ],
//   //           incidentType: [
//   //             ...new Set(response.data.filters["Incident Type"] || []),
//   //           ],
//   //         });
//   //       }
//   //     } catch (e) {
//   //       console.error("Error fetching initial data:", e);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //   getInitialData();
//   // }, []);

//   // Fetch graph data when active filters change
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchTimeIncidentsHistogramData(activeFilter);

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
//         setGraphData(aggregatedData);
//       } catch (e) {
//         console.error("Error fetching graph data:", e);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [activeFilter]);

//   const processData = () => {
//     // Process the aggregated data for chart categories and series
//     let categories = [];
//     let seriesData = [];

//     graphData.forEach((dataPoint) => {
//       if (filters.timeframe === "weekly" && dataPoint.Week) {
//         categories.push(dataPoint.Week);
//         seriesData.push(dataPoint.Count);
//       } else if (filters.timeframe === "monthly" && dataPoint.Month) {
//         categories.push(dataPoint.Month);
//         seriesData.push(dataPoint.Count);
//       } else if (filters.timeframe === "yearly" && dataPoint.Year) {
//         categories.push(dataPoint.Year);
//         seriesData.push(dataPoint.Count);
//       }
//     });

//     return { categories, seriesData };
//   };

//   const { categories, seriesData } = processData();

//   const chartOptions = {
//     chart: {
//       type: "bar",
//       toolbar: { show: false },
//     },
//     colors: ["#800080"],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "50%",
//         endingShape: "rounded",
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     xaxis: {
//       categories: categories,
//       labels: {
//         rotate: -45,
//         style: { fontSize: "12px" },
//       },
//       title: {
//         text:
//           filters?.timeframe?.charAt(0)?.toUpperCase() +
//             filters?.timeframe?.slice(1) || "Weekly",
//         style: { fontWeight: 600 },
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Count",
//         style: { fontWeight: 600 },
//       },
//     },
//     title: {
//       text: `Historic Incident's volume distribution (${filters.timeframe})`,
//       align: "center",
//     },
//   };

//   const chartSeries = [
//     {
//       name: "Incident Count",
//       data: seriesData,
//     },
//   ];

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
//         filterOptions={filterOptions}
//         onApplyFilters={handleApplyFilters}
//         showTimeFrame={true}
//         isDaily={false}
//       />
//       {isLoading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: 350,
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       ) : (
//         <ReactApexChart
//           options={chartOptions}
//           series={chartSeries}
//           type="bar"
//           height={350}
//         />
//       )}
//     </Box>
//   );
// };

// export default HistoricIncidentsChart;

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartFilters } from "../ChatFilters";
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CloseIcon from "@mui/icons-material/Close";
import { fetchTimeIncidentsHistogramData } from "../../api/graphData";

const HistoricIncidentsChart = () => {
  const [currentPage, setCurrentPage] = useState(0);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setGraphData([]);

        const response = await fetchTimeIncidentsHistogramData(activeFilter);

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
  }, [activeFilter]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filters.timeframe]);

  const filteredData = graphData.filter((dataPoint) => {
    if (filters.timeframe === "weekly" && dataPoint.Week) return true;
    if (filters.timeframe === "monthly" && dataPoint.Month) return true;
    if (filters.timeframe === "yearly" && dataPoint.Year) return true;
    return false;
  });

  const processData = () => {
    if (filteredData.length === 0) {
      return {
        categories: ["No data"],
        seriesData: [0],
        isEmpty: true,
      };
    }

    let categories = [];
    let seriesData = [];

    filteredData.forEach((dataPoint) => {
      if (filters.timeframe === "weekly" && dataPoint.Week) {
        categories.push(dataPoint.Week);
        seriesData.push(dataPoint.Count);
      } else if (filters.timeframe === "monthly" && dataPoint.Month) {
        categories.push(dataPoint.Month);
        seriesData.push(dataPoint.Count);
      } else if (filters.timeframe === "yearly" && dataPoint.Year) {
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
        : `Historic Incident's volume distribution (${filters.timeframe})`,
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

  const handleApplyFilters = () => {
    setActiveFilter(filters);
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <ChartFilters
            filters={filters}
            onFiltersChange={setFilters}
            filterOptions={filterOptions}
            onApplyFilters={handleApplyFilters}
            showTimeFrame={false}
            isDaily={false}
          />
        </Box>

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
        <Box sx={{ position: "relative", width: "100%" }}>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </Box>
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
          \{" "}
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
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={550}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default HistoricIncidentsChart;
