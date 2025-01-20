// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import { Box } from "@mui/material";
// import { ChartFilters } from "../ChatFilters";
// import { incidentTypesHistogramData } from "../../data/data";

// const IncidentTypeBarChart = () => {
//   console.log(
//     "incident data",
//     incidentTypesHistogramData.graphs[0].figure.map((eachIncident) => {
//       return eachIncident;
//     })
//   );
//   const categoryData = incidentTypesHistogramData.graphs[0].figure.map(
//     (eachIncident) => {
//       return eachIncident["Incident Type"];
//     }
//   );
//   const countData = incidentTypesHistogramData.graphs[0].figure.map(
//     (eachIncident) => {
//       return eachIncident["Count"];
//     }
//   );
//   const slicedData = categoryData.slice(0, 10);
//   console.log("array data", categoryData.slice(0, 10));
//   const [filters, setFilters] = useState({
//     client: "",
//     site: "",
//     region: "",
//     incidentType: "",
//     timeframe: "weekly",
//   });
//   const options = {
//     chart: {
//       type: "bar",
//       toolbar: {
//         show: false,
//       },
//       zoom: {
//         enabled: true,
//       },
//       animations: {
//         enabled: true,
//       },
//     },
//     colors: ["#800080"], // Purple color
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "50%",
//         endingShape: "rounded",
//       },
//     },
//     scrollbar: {
//       enabled: true,
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     xaxis: {
//       categories: slicedData,
//       labels: {
//         rotate: -90,
//         style: {
//           fontSize: "10px",
//         },
//         // formatter: (value) =>
//         //   value.length > 10 ? `${value.slice(0, 10)}...` : value,
//       },
//       title: {
//         text: "Incident Type",
//         style: {
//           fontWeight: 600,
//         },
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Count",
//         style: {
//           fontWeight: 600,
//         },
//       },
//     },
//     title: {
//       text: "Overall Distribution of Incident types",
//       align: "center",
//     },
//   };

//   const series = [
//     {
//       name: "Count",
//       data: countData.slice(0, 10),
//     },
//   ];

//   const handleApplyFilters = async () => {
//     // Here you would make your API call with the selected filters
//     // Example:
//     // const response = await fetch('/api/trend-data', {
//     //   method: 'POST',
//     //   body: JSON.stringify({
//     //     client: selectedClient,
//     //     site: selectedSite,
//     //     region: selectedRegion,
//     //     incidentType: selectedIncidentType,
//     //     timeframe: selectedFilter
//     //   })
//     // });
//     // const newData = await response.json();
//     // Update your chart data here
//     // setIsDrawerOpen(false);
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
//         // showTimeFrame={true}
//       />
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="bar"
//         height={400}
//       />
//     </Box>
//   );
// };

// export default IncidentTypeBarChart;
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box, IconButton, Typography, Stack } from "@mui/material";
import { ChartFilters } from "../ChatFilters";
import { incidentTypesHistogramData } from "../../data/data";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const IncidentTypeBarChart = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Get all data
  const categoryData = incidentTypesHistogramData.graphs[0].figure.map(
    (eachIncident) => eachIncident["Incident Type"]
  );

  const countData = incidentTypesHistogramData.graphs[0].figure.map(
    (eachIncident) => eachIncident["Count"]
  );

  // Calculate total pages
  const totalPages = Math.ceil(categoryData.length / itemsPerPage);

  // Get current page data
  const getCurrentPageData = () => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      categories: categoryData.slice(start, end),
      counts: countData.slice(start, end),
    };
  };

  const currentData = getCurrentPageData();

  const [filters, setFilters] = useState({
    client: "",
    site: "",
    region: "",
    incidentType: "",
    timeframe: "weekly",
  });

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
      animations: {
        enabled: true,
      },
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
      categories: currentData.categories,
      labels: {
        rotate: -90,
        style: {
          fontSize: "10px",
        },
      },
      title: {
        text: "Incident Type",
        style: {
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: {
          fontWeight: 600,
        },
      },
    },
    title: {
      text: "Overall Distribution of Incident types",
      align: "center",
    },
  };

  const series = [
    {
      name: "Count",
      data: currentData.counts,
    },
  ];

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleApplyFilters = async () => {
    // Your filter logic here
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
        onApplyFilters={handleApplyFilters}
      />

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
      />

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
    </Box>
  );
};

export default IncidentTypeBarChart;
