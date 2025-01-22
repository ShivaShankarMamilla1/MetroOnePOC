import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://4.255.48.125/metroone-api/',
});
//incident type graph without the day filters
export const fetchIncidentTypes = async (payload) => {
    try {
        const response = await axiosInstance.post('/histogram/incident-types', payload);
        return response
    } catch (error) {
        console.error('Error fetching incident types histogram:', error);
        throw error;
    }
};
//first heatmap graph
export const fetchHourlyIncidentHeatMapData = async (payload) => {
    try {
        const response = await axiosInstance.post('/heatmap/hourly-incidents', payload);
        return response
    } catch (error) {
        console.error('Error fetching incident types histogram:', error);
        throw error;
    }
};
export const fetchTimeIncidentsHistogramData = async (payload) => {
    try {
        const response = await axiosInstance.post('/histogram/time-incidents', payload);
        return response
    } catch (error) {
        console.error('Error fetching incident types histogram:', error);
        throw error;
    }
};
export const fetchTrendLinePlotData = async (payload) => {
    try {
        const response = await axiosInstance.post('/lineplot/trends', payload);
        return response
    } catch (error) {
        console.error('Error fetching incident types histogram:', error);
        throw error;
    }
};
export const fetchIncidentDistributionHeatMap = async (payload) => {
    try {
        const response = await axiosInstance.post('/heatmap/incident-distribution', payload);
        return response
    } catch (error) {
        console.error('Error fetching incident types histogram:', error);
        throw error;
    }
}
export const fetchForecastData = async (payload) => {
    try {
        const response = await axiosInstance.post('/forecast/incident-counts', payload);
        return response
    } catch (error) {
        console.error('Error fetching incident types histogram:', error);
        throw error;
    }
};