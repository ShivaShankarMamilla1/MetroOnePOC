// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import { ChartFilters } from "../ChatFilters";
// import { Box, IconButton, CircularProgress } from "@mui/material";
// import { fetchTimeIncidentsHistogramData } from "../../api/graphData";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// const HistoricIncidentsChart = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [graphData, setGraphData] = useState([]); // Holds the chart data
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

//   const pageSize = 10; // Number of data points per page

//   // Fetch graph data when active filters change
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         setGraphData([]); // Clear previous graph data when fetching new data

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
//               metroRegion: [...new Set(response.data.filters["Metro Region"] || [])],
//               incidentType: [...new Set(response.data.filters["Incident Type"] || [])],
//             });
//           }
//         }
//         console.log("aggregatedData",aggregatedData)
//         setGraphData(aggregatedData); // Update graphData with the new filtered data
//         setCurrentPage(0); // Reset to first page when new data comes in
//       } catch (e) {
//         console.error("Error fetching graph data:", e);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [activeFilter]);

//   // Apply filters and reload the graph
//   const handleApplyFilters = () => {
//     console.log("applied filter")
//     setActiveFilter(filters); // Trigger data fetching based on new filters
//   };

//   // Pagination: Go to the previous page
//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 0));
//   };

//   // Pagination: Go to the next page
//   const handleNextPage = () => {
//     setCurrentPage((prev) => {
//       const maxPage = Math.ceil(graphData.length / pageSize) - 1;
//       return Math.min(prev + 1, maxPage);
//     });
//   };

//   // Paginate the current graph data
//   // const paginatedData = graphData.slice(
//   //   currentPage * pageSize,
//   //   (currentPage + 1) * pageSize
//   // );

//   const filteredData = graphData.filter((dataPoint) => {
//     if (filters.timeframe === "weekly" && dataPoint.Week) {
//       return true;
//     } else if (filters.timeframe === "monthly" && dataPoint.Month) {
//       return true;
//     } else if (filters.timeframe === "yearly" && dataPoint.Year) {
//       return true;
//     }
//   });

//   const paginatedData = filteredData.slice(
//     currentPage * pageSize,
//     (currentPage + 1) * pageSize
//   );

//   // Prepare data for the chart
//   const processData = () => {
//     let categories = [];
//     let seriesData = [];
//     console.log("paginatedData", paginatedData);

//     paginatedData.forEach((dataPoint) => {
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

//   // Process data to fit the chart
//   useEffect(()=>{
//     console.log("timeframe change")
//     setCurrentPage(0);
//   },[filters.timeframe])

// // const processData = () => {
// //   let categories = [];
// //   let seriesData = [];

// //   // Check the active timeframe filter and only process the relevant data
// //   if (filters.timeframe === "weekly") {
// //     categories=[];
// //     seriesData=[];
// //     paginatedData.forEach((dataPoint) => {
// //       if (dataPoint.Week) {
// //         categories.push(dataPoint.Week);
// //         seriesData.push(dataPoint.Count);
// //       }
// //     });
// //     console.log("categories", categories)
// //     console.log("seriesData", seriesData)
// //   } else if (filters.timeframe === "monthly") {
// //     categories=[];
// //     seriesData=[];
// //     paginatedData.forEach((dataPoint) => {
// //       if (dataPoint.Month) {
// //         categories.push(dataPoint.Month);
// //         seriesData.push(dataPoint.Count);
// //       }
// //     });
// //   } else if (filters.timeframe === "yearly") {
// //     categories=[];
// //     seriesData=[];
// //     paginatedData.forEach((dataPoint) => {
// //       if (dataPoint.Year) {
// //         categories.push(dataPoint.Year);
// //         seriesData.push(dataPoint.Count);
// //       }
// //     });
// //   }

// //   return { categories, seriesData };
// // };

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
//         text: filters?.timeframe?.charAt(0)?.toUpperCase() + filters?.timeframe?.slice(1) || "Weekly",
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
//         <Box sx={{ position: "relative", width: "100%" }}>
//           <IconButton
//             onClick={handlePrevPage}
//             disabled={currentPage === 0}
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
//             options={chartOptions}
//             series={chartSeries}
//             type="bar"
//             height={350}
//           />

//           <IconButton
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
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default HistoricIncidentsChart;
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartFilters } from "../ChatFilters";
import { Box, IconButton, CircularProgress, Typography } from "@mui/material";
import { fetchTimeIncidentsHistogramData } from "../../api/graphData";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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

  const pageSize = 10;

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

  const handleApplyFilters = () => {
    setActiveFilter(filters);
  };

  const filteredData = graphData.filter((dataPoint) => {
    if (filters.timeframe === "weekly" && dataPoint.Week) return true;
    if (filters.timeframe === "monthly" && dataPoint.Month) return true;
    if (filters.timeframe === "yearly" && dataPoint.Year) return true;
    return false;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const processData = () => {
    if (paginatedData.length === 0) {
      return {
        categories: ["No data"],
        seriesData: [0],
        isEmpty: true,
      };
    }

    let categories = [];
    let seriesData = [];

    paginatedData.forEach((dataPoint) => {
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

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
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
      <ChartFilters
        filters={filters}
        onFiltersChange={setFilters}
        filterOptions={filterOptions}
        onApplyFilters={handleApplyFilters}
        showTimeFrame={true}
        isDaily={false}
      />
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
          <IconButton
            onClick={handlePrevPage}
            disabled={currentPage === 0 || isEmpty}
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
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />

          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1 || isEmpty}
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
              Page {currentPage + 1} of {totalPages}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HistoricIncidentsChart;
