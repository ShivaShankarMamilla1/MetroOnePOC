import { useEffect, useState } from "react";
import AppHeader from "./components/Header";
import TrendGraphWithFilters from "./components/Graphs/IncidentTrendGraph";
import HeatmapGraph from "./components/Graphs/HeatMapGraph";
import IncidentTypeBarChart from "./components/Graphs/IncidentTypeBarChart";
import HistoricIncidentsChart from "./components/Graphs/HistoricIncidentsChart";
import Heatmap from "./components/Graphs/HeatMap";
import LineChart from "./components/Graphs/LineChart";
import LoginPage from "./Pages/Login";
import { ChartFilters } from "./components/ChatFilters";
import { fetchTrendLinePlotData } from "./api/graphData";

function App() {
  const [authenticated, setIsAuthenticated] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    client: [],
    site: [],
    metroRegion: [],
    incidentType: [],
  });
  const [incidentTypeOptions, setIncidenTypeOptions] = useState([]);

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
  const handleApplyFilters = () => {
    setActiveFilter(filters);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchTrendLinePlotData(activeFilter);
        console.log("response of filters", response);
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
          console.log(
            "incident options",
            response.data.filters["Incident Type"]
          );
          setIncidenTypeOptions(response.data.filters["Incident Type"] || []);
        }
      } catch (e) {
        console.error("Error fetching graph data:", e);
      }
    };
    getData();
  }, [activeFilter]);

  return (
    <>
      {authenticated ? (
        <>
          <AppHeader />
          <ChartFilters
            filters={filters}
            onFiltersChange={setFilters}
            onApplyFilters={handleApplyFilters}
            showTimeFrame={true}
            filterOptions={filterOptions}
            isDaily={true}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            <div
              style={{
                margin: "15px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                height: "500px",
                width: "60%",
              }}
            >
              <LineChart
                activeFilter={activeFilter}
                filters={filters}
                incidentTypeOptions={incidentTypeOptions}
                showTimeFrame={false}
              />
            </div>

            <div
              style={{
                margin: "15px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                height: "500px",
                width: "35%",
              }}
            >
              <Heatmap
                activeFilter={activeFilter}
                filters={filters}
                incidentTypeOptions={incidentTypeOptions}
                showTimeFrame={true}
              />
            </div>

            <div
              style={{
                margin: "15px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                height: "500px",
                width: "47.5%",
              }}
            >
              <HeatmapGraph
                activeFilter={activeFilter}
                filters={filters}
                incidentTypeOptions={incidentTypeOptions}
                showTimeFrame={false}
              />
            </div>
            <div
              style={{
                margin: "15px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                height: "500px",
                width: "47.5%",
              }}
            >
              <IncidentTypeBarChart
                activeFilter={activeFilter}
                filters={filters}
                incidentTypeOptions={incidentTypeOptions}
              />
            </div>
            <div
              style={{
                margin: "15px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                height: "500px",
                width: "47.5%",
              }}
            >
              <HistoricIncidentsChart
                activeFilter={activeFilter}
                filters={filters}
                incidentTypeOptions={incidentTypeOptions}
                showTimeFrame={true}
              />
            </div>
            <div
              style={{
                margin: "15px",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                height: "500px",
                width: "47.5%",
              }}
            >
              <TrendGraphWithFilters
                activeFilter={activeFilter}
                filters={filters}
                incidentTypeOptions={incidentTypeOptions}
                showTimeFrame={true}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <AppHeader />
          <LoginPage setIsAuthenticated={setIsAuthenticated} />
        </>
      )}
    </>
  );
}

export default App;
