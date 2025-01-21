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
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { fetchIncidentTypes } from "../../api/graphData";

// const IncidentTypeBarChart = () => {
//   const [currentPage, setCurrentPage] = useState(0);
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
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetchIncidentTypes(activeFilter);
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
//   }, [activeFilter]); // Only depends on activeFilter now

//   // Get all data
//   const categoryData = graphData.map(
//     (eachIncident) => eachIncident["Incident Type"]
//   );
//   const countData = graphData.map((eachIncident) => eachIncident["Count"]);
//   const totalPages = Math.ceil(categoryData.length / itemsPerPage);

//   const getCurrentPageData = () => {
//     const start = currentPage * itemsPerPage;
//     const end = start + itemsPerPage;
//     return {
//       categories: categoryData.slice(start, end),
//       counts: countData.slice(start, end),
//     };
//   };

//   const currentData = getCurrentPageData();

//   const options = {
//     chart: {
//       type: "bar",
//       toolbar: { show: false },
//       zoom: { enabled: true },
//       animations: { enabled: true },
//     },
//     colors: ["#800080"],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "50%",
//         endingShape: "rounded",
//       },
//     },
//     dataLabels: { enabled: false },
//     xaxis: {
//       categories: currentData.categories,
//       labels: {
//         rotate: -90,
//         style: { fontSize: "10px" },
//       },
//       title: {
//         text: "Incident Type",
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
//       text: "Overall Distribution of Incident types",
//       align: "center",
//     },
//   };

//   const series = [{ name: "Count", data: currentData.counts }];

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(0, prev - 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
//   };

//   const handleApplyFilters = () => {
//     // Update activeFilter with tempFilters to trigger API call
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
//         isIncidentType={false}
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
//           type="bar"
//           height={400}
//         />
//       )}
//       <Stack
//         direction="row"
//         spacing={2}
//         alignItems="center"
//         justifyContent="center"
//         sx={{ mt: 2 }}
//       >
//         <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
//           <ArrowBackIcon />
//         </IconButton>
//         <Typography variant="body1">
//           Page {currentPage + 1} of {totalPages}
//         </Typography>
//         <IconButton
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages - 1}
//         >
//           <ArrowForwardIcon />
//         </IconButton>
//       </Stack>
//     </Box>
//   );
// };

// export default IncidentTypeBarChart;

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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OpenInFullIcon from "@mui/icons-material/OpenInFull"; // Maximize icon
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen"; // Minimize icon
import { DataGrid } from "@mui/x-data-grid";
import { fetchIncidentTypes } from "../../api/graphData";

const IncidentTypeBarChart = () => {
  const [currentPage, setCurrentPage] = useState(0);
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
  const itemsPerPage = 10;

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchIncidentTypes(activeFilter);
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

  const categoryData = graphData.map(
    (eachIncident) => eachIncident["Incident Type"]
  );
  const countData = graphData.map((eachIncident) => eachIncident["Count"]);
  const totalPages = Math.ceil(categoryData.length / itemsPerPage);

  const getCurrentPageData = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      categories: categoryData.slice(start, end),
      counts: countData.slice(start, end),
    };
  };

  const currentData = getCurrentPageData();

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: true },
      animations: { enabled: true },
    },
    colors: ["#800080"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: currentData.categories,
      labels: {
        rotate: -90,
        style: { fontSize: "10px" },
      },
      title: {
        text: "Incident Type",
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
      text: "Overall Distribution of Incident types",
      align: "center",
    },
  };

  const series = [{ name: "Count", data: currentData.counts }];

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleApplyFilters = () => {
    setActiveFilter(tempFilters);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // DataGrid columns and rows
  const columns = [
    { field: "incidentType", headerName: "Incident Type", flex: 1 },
    { field: "count", headerName: "Count", flex: 1 },
  ];

  const rows = graphData.map((data, index) => ({
    id: index,
    incidentType: data["Incident Type"],
    count: data["Count"],
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
          isIncidentType={false}
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
            height: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      )}

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1">
          Page {currentPage + 1} of {totalPages}
        </Typography>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Stack>

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

export default IncidentTypeBarChart;
