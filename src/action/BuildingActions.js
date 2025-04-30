import apiService from "../service/Service";
import config from "../config/config";

export const buildingAction = {
  createBuilding,
  getAllBuildings,
};

async function createBuilding(buildingData) {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.createBuilding;

    const payload = {
      companyId: 1, //Hard coded for now
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
    console.log("Failed to create building:", err);
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
