import React, { useState } from "react";
import AppHeader from "./components/Header";
import TrendGraphWithFilters from "./components/Graphs/IncidentTrendGraph";
import HeatmapGraph from "./components/Graphs/HeatMapGraph";
import IncidentTypeBarChart from "./components/Graphs/IncidentTypeBarChart";
import HistoricIncidentsChart from "./components/Graphs/HistoricIncidentsChart";
import Heatmap from "./components/Graphs/HeatMap";
import LineChart from "./components/Graphs/LineChart";
import LoginPage from "./Pages/Login";

function App() {
  const [authenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      {authenticated ? (
        <>
          <AppHeader />
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
            <LineChart/>               
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
            <Heatmap />
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
               <HeatmapGraph />
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
             <IncidentTypeBarChart />
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
             <HistoricIncidentsChart />
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
              <TrendGraphWithFilters />
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
