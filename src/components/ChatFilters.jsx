import React, { useState } from "react";
import {
  Modal,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyFilters = async () => {
    if (onApplyFilters) {
      await onApplyFilters(filters);
    }
    setIsModalOpen(false);
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
        }}
      >
        <IconButton
          onClick={() => setIsModalOpen(true)}
          size="large"
          edge="start"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        {showTimeFrame && (
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Timeframe</InputLabel>
            <Select
              value={filters.timeframe}
              defaultValue={"weekly"}
              label="Timeframe"
              onChange={(e) => handleFilterChange("timeframe", e.target.value)}
            >
              {isDaily && <MenuItem value="daily">Daily</MenuItem>}
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            mx: "auto",
            my: "10%",
            borderRadius: 2,
          }}
        >
          <Typography id="filter-modal-title" variant="h6" sx={{ mb: 3 }}>
            Filters
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
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

            <FormControl fullWidth>
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

            <FormControl fullWidth>
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

            {isIncidentType && (
              <FormControl fullWidth>
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
            )}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
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
      </Modal>
    </Box>
  );
};
