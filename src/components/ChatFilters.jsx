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
    clients: ["Client A", "Client B", "Client C"],
    sites: ["Site 1", "Site 2", "Site 3"],
    regions: ["North", "South", "East", "West"],
    incidentTypes: ["Type 1", "Type 2", "Type 3"],
  },
  showTimeFrame = false,
  isDaily = true,
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
                value={filters.client}
                label="Client"
                onChange={(e) => handleFilterChange("client", e.target.value)}
              >
                {filterOptions.clients.map((client) => (
                  <MenuItem key={client} value={client}>
                    {client}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Site</InputLabel>
              <Select
                value={filters.site}
                label="Site"
                onChange={(e) => handleFilterChange("site", e.target.value)}
              >
                {filterOptions.sites.map((site) => (
                  <MenuItem key={site} value={site}>
                    {site}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Metro Region</InputLabel>
              <Select
                value={filters.region}
                label="Metro Region"
                onChange={(e) => handleFilterChange("region", e.target.value)}
              >
                {filterOptions.regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Incident Type</InputLabel>
              <Select
                value={filters.incidentType}
                label="Incident Type"
                onChange={(e) =>
                  handleFilterChange("incidentType", e.target.value)
                }
              >
                {filterOptions.incidentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleApplyFilters}
              sx={{ mt: 2 }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
