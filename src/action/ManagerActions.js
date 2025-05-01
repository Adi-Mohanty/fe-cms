import apiService from "../service/Service";
import config from "../config/config";

export const managerActions = {
  fetchBuildings,
  createManager,
  fetchManagers,
};

async function fetchBuildings() {
  try {
    const res = await apiService.get(
      config.baseUrl + config.apiEndpoint.getAllBuildings
    );
    return Array.isArray(res.data.data) ? res.data.data : [];
  } catch (err) {
    console.error("Failed to fetch buildings:", err);
    return [];
  }
}

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

async function fetchManagers() {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.getManagersByRole;
    const response = await apiService.get(apiEndPoint, { role: "MANAGER" });

    return response?.data?.data || [];
  } catch (err) {
    console.error("Error fetching managers:", err);
    return [];
  }
}
