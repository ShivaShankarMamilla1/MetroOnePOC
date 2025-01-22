// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import {
//   Box,
//   IconButton,
//   Typography,
//   Stack,
//   CircularProgress,
// } from "@mui/material";
// import { ChartFilters } from "../ChatFilters";
// import { fetchHourlyIncidentHeatMapData } from "../../api/graphData";

// const HeatmapGraph = () => {
//   const [graphData, setGraphData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [filters, setFilters] = useState({
//     client: "",
//     site: "",
//     metroRegion: "",
//     incidentType: "",
//     timeframe: "weekly",
//   });
//   // Separate state for active filters that will trigger the API call
//   const [activeFilter, setActiveFilter] = useState({
//     client: "",
//     site: "",
//     metroRegion: "",
//     incidentType: "",
//   });
//   // State for temporary filters that update on change but don't trigger API
//   const [tempFilters, setTempFilters] = useState({
//     client: "",
//     site: "",
//     metroRegion: "",
//     incidentType: "",
//   });
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchHourlyIncidentHeatMapData(activeFilter);
//         setFilters((prevFilters) => ({
//           ...prevFilters,
//           client: response.data.filters.Client || "",
//           site: response.data.filters.Site || "",
//           metroRegion: response.data.filters["Metro Region"] || "",
//           incidentType: response.data.filters["Incident Type"] || "",
//           timeframe: "",
//         }));
//         const aggregatedData = [];
//         if (response.data.graphs && response.data.graphs.length > 0) {
//           response.data.graphs.forEach((graph) => {
//             if (graph.figure && Array.isArray(graph.figure)) {
//               aggregatedData.push(...graph.figure);
//             }
//           });
//         }
//         setGraphData(aggregatedData);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getData();
//   }, [activeFilter]);
//   const options = {
//     chart: {
//       type: "heatmap",
//       toolbar: {
//         show: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     colors: ["#008FFB"],
//     xaxis: {
//       title: {
//         text: "Hour of Day",
//       },
//       categories: Array.from({ length: 24 }, (_, i) => i.toString()),
//     },
//     labels: {
//       rotate: -90,
//       style: {
//         fontSize: "10px",
//         colors: "#000",
//       },
//     },
//     plotOptions: {
//       heatmap: {
//         shadeIntensity: 0.5,
//         useFillColorAsStroke: true,
//         colorScale: {
//           ranges: [
//             { from: 0, to: 50, color: "#FFEB3B" }, // Light yellow
//             { from: 51, to: 100, color: "#FFC107" }, // Dark yellow
//             { from: 101, to: 150, color: "#FF9800" }, // Orange
//             { from: 151, to: 200, color: "#FF5722" }, // Red
//             { from: 201, to: 1000, color: "#B71C1C" }, // Dark red
//           ],
//         },
//         distributed: false,
//         borderWidth: 0,
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Day of Week",
//       },
//       categories: [
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//       ],
//     },
//     title: {
//       text: "Overall Distribution  Incident’s Volume (hourly)",
//       align: "center",
//     },
//     legend: {
//       position: "top",
//       showForZeroSeries: false,
//       labels: {
//         // Hide specific range values above 300 in the legend
//         formatter: (seriesName) => {
//           // Filter out the highest range from the legend
//           if (seriesName === "1.79+") {
//             return ""; // Empty return hides that entry from the legend
//           }
//           return seriesName;
//         },
//       },
//     },
//   };

//   // Generate dummy data (random incident counts for each day and hour)
//   const days = graphData.map((eachDay) => eachDay);
//   const series = days.map((eachDay, dayIndex) => ({
//     name: eachDay.Day,
//     data: eachDay.Count,
//   }));
//   const handleApplyFilters = async () => {
//     setActiveFilter(tempFilters);
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
//         filters={tempFilters}
//         onFiltersChange={setTempFilters}
//         filterOptions={filters}
//         onApplyFilters={handleApplyFilters}
//       />
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
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="heatmap"
//           height={380}
//         />
//       )}
//     </Box>
//   );
// };

// export default HeatmapGraph;

import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  IconButton,
  Typography,
  Stack,
  CircularProgress,
  Modal,
} from "@mui/material";
import { ChartFilters } from "../ChatFilters";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CloseIcon from "@mui/icons-material/Close";
import { fetchHourlyIncidentHeatMapData } from "../../api/graphData";

const HeatmapGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  });
  const [tempFilters, setTempFilters] = useState({
    client: "",
    site: "",
    metroRegion: "",
    incidentType: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchHourlyIncidentHeatMapData(activeFilter);
        setFilters((prevFilters) => ({
          ...prevFilters,
          client: response.data.filters.Client || "",
          site: response.data.filters.Site || "",
          metroRegion: response.data.filters["Metro Region"] || "",
          incidentType: response.data.filters["Incident Type"] || "",
          timeframe: "",
        }));
        const aggregatedData = [];
        if (response.data.graphs && response.data.graphs.length > 0) {
          response.data.graphs.forEach((graph) => {
            if (graph.figure && Array.isArray(graph.figure)) {
              aggregatedData.push(...graph.figure);
            }
          });
        }
        setGraphData(aggregatedData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [activeFilter]);

  const options = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#008FFB"],
    xaxis: {
      title: {
        text: "Hour of Day",
      },
      categories: Array.from({ length: 24 }, (_, i) => i.toString()),
    },
    labels: {
      rotate: -90,
      style: {
        fontSize: "10px",
        colors: "#000",
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            { from: 0, to: 50, color: "#FFEB3B" }, // Light yellow
            { from: 51, to: 100, color: "#FFC107" }, // Dark yellow
            { from: 101, to: 150, color: "#FF9800" }, // Orange
            { from: 151, to: 200, color: "#FF5722" }, // Red
            { from: 201, to: 1000, color: "#B71C1C" }, // Dark red
          ],
        },
        distributed: false,
        borderWidth: 0,
      },
    },
    yaxis: {
      title: {
        text: "Day of Week",
      },
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    title: {
      text: "Overall Distribution  Incident’s Volume (hourly)",
      align: "center",
    },
    legend: {
      position: "top",
      showForZeroSeries: false,
      labels: {
        // Hide specific range values above 300 in the legend
        formatter: (seriesName) => {
          // Filter out the highest range from the legend
          if (seriesName === "1.79+") {
            return ""; // Empty return hides that entry from the legend
          }
          return seriesName;
        },
      },
    },
  };

  // Generate dummy data (random incident counts for each day and hour)
  const days = graphData.map((eachDay) => eachDay);
  const series = days.map((eachDay, dayIndex) => ({
    name: eachDay.Day,
    data: eachDay.Count,
  }));

  const handleApplyFilters = async () => {
    setActiveFilter(tempFilters);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // DataGrid columns and rows
  const columns = [
    { field: "day", headerName: "Day", width: 150 },
    ...Array.from({ length: 24 }, (_, i) => ({
      field: `hour_${i}`,
      headerName: `${i}:00`,
      width: 100,
    })),
  ];

  const rows = graphData.map((dayData, index) => ({
    id: index,
    day: dayData.Day,
    ...dayData.Count.reduce((acc, count, hour) => {
      acc[`hour_${hour}`] = count;
      return acc;
    }, {}),
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
          filters={tempFilters}
          onFiltersChange={setTempFilters}
          filterOptions={filters}
          onApplyFilters={handleApplyFilters}
        />
        <IconButton onClick={toggleModal}>
          {isModalOpen ? <CloseIcon /> : <AspectRatioIcon />}
        </IconButton>
      </Box>

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
        <ReactApexChart
          options={options}
          series={series}
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

          <ReactApexChart
            options={options}
            series={series}
            type="heatmap"
            height={550}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default HeatmapGraph;
