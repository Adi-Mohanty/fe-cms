import apiService from "../service/Service";
import config from "../config/config";

const adminDashboardActions = {
  getDashboardData,
};

async function getDashboardData(companyId = 1) {
  try {
    const apiEndPoint = `${config.baseUrl}${config.apiEndpoint.getAdminDashboardData}`;
    const response = await apiService.get(apiEndPoint, { companyId });
    return response?.data || null;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return null;
  }
}

export default adminDashboardActions;
