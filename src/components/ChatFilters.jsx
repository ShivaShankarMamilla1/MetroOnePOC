import React from "react";
import {
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const ChartFilters = ({
  filters,
  onFiltersChange,
  onApplyFilters,
  filterOptions = {
    client: [],
    site: [],
    metroRegion: [],
    incidentType: [],
  },
  showTimeFrame = false,
  isDaily = true,
  isIncidentType = true,
  defaultFilters = {
    client: "",
    site: "",
    metroRegion: "",
    incidentType: "",
    timeframe: "weekly",
  },
}) => {
  const handleApplyFilters = async () => {
    if (onApplyFilters) {
      await onApplyFilters(filters);
    }
  };

  const handleFilterChange = (filterName, value) => {
    onFiltersChange({
      ...filters,
      [filterName]: value,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange(defaultFilters);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Client</InputLabel>
            <Select
              value={filters.client || ""}
              label="Client"
              onChange={(e) => handleFilterChange("client", e.target.value)}
            >
              {Array.isArray(filterOptions.client) &&
                filterOptions.client.map((client) => (
                  <MenuItem key={client} value={client}>
                    {client}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Site</InputLabel>
            <Select
              value={filters.site || ""}
              label="Site"
              onChange={(e) => handleFilterChange("site", e.target.value)}
            >
              {Array.isArray(filterOptions.site) &&
                filterOptions.site.map((site) => (
                  <MenuItem key={site} value={site}>
                    {site}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Metro Region</InputLabel>
            <Select
              value={filters.metroRegion || ""}
              label="Metro Region"
              onChange={(e) =>
                handleFilterChange("metroRegion", e.target.value)
              }
            >
              {Array.isArray(filterOptions.metroRegion) &&
                filterOptions.metroRegion.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* {isIncidentType && (
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Incident Type</InputLabel>
              <Select
                value={filters.incidentType || ""}
                label="Incident Type"
                onChange={(e) =>
                  handleFilterChange("incidentType", e.target.value)
                }
              >
                {Array.isArray(filterOptions.incidentType) &&
                  filterOptions.incidentType.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )} */}

          {/* {showTimeFrame && (
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Timeframe</InputLabel>
              <Select
                value={filters.timeframe || "weekly"}
                label="Timeframe"
                onChange={(e) =>
                  handleFilterChange("timeframe", e.target.value)
                }
              >
                {isDaily && <MenuItem value="daily">Daily</MenuItem>}
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          )} */}

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
