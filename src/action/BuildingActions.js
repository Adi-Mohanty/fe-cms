import apiService from "../service/Service";
import config from "../config/config";

export const buildingAction = {
  createOrUpdateBuilding,
  getAllBuildings,
  getRoomTypes,
};

async function createOrUpdateBuilding(buildingData, buildingId = null) {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.createBuilding;

    const payload = {
      ...(buildingId && { id: buildingId }),
      companyId: 1,
      name: buildingData.name,
      address: buildingData.address,
      state: buildingData.state,
      city: buildingData.city,
      latitude: buildingData.latitude,
      longitude: buildingData.longitude,
      numberOfFloors: buildingData.numberOfFloors,
      managerId: buildingData.managerId || null,
      managerName: buildingData.managerName,
      managerEmail: buildingData.managerEmail,
      managerPhoneNumber: buildingData.managerPhoneNumber,
      managerPassword: buildingData.managerPassword,
      floorRoomMapData: buildingData.floorRoomMapData,
    };

    const response = await apiService.post(apiEndPoint, payload);
    return response ? response.data : null;
  } catch (err) {
    console.error("Failed to create/update building:", err);
    return null;
  }
}

async function getAllBuildings() {
  try {
    const url = config.baseUrl + config.apiEndpoint.getAllBuildings;
    const params = { companyId: 1 };
    const response = await apiService.get(url, params);
    return response ? response.data : [];
  } catch (error) {
    console.error("Failed to fetch buildings:", error);
    return [];
  }
}

async function getRoomTypes() {
  try {
    const url = config.baseUrl + config.apiEndpoint.getRoomList;
    const response = await apiService.get(url);
    return response?.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch room types:", error);
    return [];
  }
}
