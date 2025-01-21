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
import { Box, CircularProgress, IconButton, Modal } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull"; // Maximize icon
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen"; // Minimize icon
import { DataGrid } from "@mui/x-data-grid";
import { fetchTimeIncidentsHistogramData } from "../../api/graphData";

const HistoricIncidentsChart = () => {
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

  // Fetch graph data when active filters change
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
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
      } catch (e) {
        console.error("Error fetching graph data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter]);

  const processData = () => {
    // Process the aggregated data for chart categories and series
    let categories = [];
    let seriesData = [];

    graphData.forEach((dataPoint) => {
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

    return { categories, seriesData };
  };

  const { categories, seriesData } = processData();

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
      },
      title: {
        text:
          filters?.timeframe?.charAt(0)?.toUpperCase() +
            filters?.timeframe?.slice(1) || "Weekly",
        style: { fontWeight: 600 },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: { fontWeight: 600 },
      },
    },
    title: {
      text: `Historic Incident's volume distribution (${filters.timeframe})`,
      align: "center",
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

  // DataGrid columns and rows
  const columns = [
    { field: "timeframe", headerName: "Timeframe", flex: 1 },
    { field: "count", headerName: "Count", flex: 1 },
  ];

  const rows = graphData.map((data, index) => ({
    id: index,
    timeframe:
      filters.timeframe === "weekly"
        ? data.Week
        : filters.timeframe === "monthly"
        ? data.Month
        : data.Year,
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
          filterOptions={filterOptions}
          onApplyFilters={handleApplyFilters}
          showTimeFrame={true}
          isDaily={false}
        />
        <IconButton onClick={toggleModal}>
          {isModalOpen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
        </IconButton>
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
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
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

          {/* Left side: Bar Chart */}
          <Box sx={{ flex: 1 }}>
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
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

export default HistoricIncidentsChart;
