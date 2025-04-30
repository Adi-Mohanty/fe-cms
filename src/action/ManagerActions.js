import apiService from "../service/Service";
import config from "../config/config";

export const managerActions = {
  fetchBuildings,
  createManager,
  fetchManagers,
};

// 1. Fetch all buildings (for dropdown)
async function fetchBuildings() {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.getAllBuildings;
    const response = await apiService.get(apiEndPoint);
    return response?.data || [];
  } catch (err) {
    console.error("Error fetching buildings:", err);
    return [];
  }
}

// 2. Create a new manager
async function createManager(managerData) {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.createManager;
    const response = await apiService.post(apiEndPoint, managerData);
    return response?.data || null;
  } catch (err) {
    console.error("Error creating manager:", err);
    return null;
  }
}

// 3. Fetch all managers
async function fetchManagers() {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.getAllManagers;
    const response = await apiService.get(apiEndPoint);
    return response?.data || [];
  } catch (err) {
    console.error("Error fetching managers:", err);
    return [];
  }
}
