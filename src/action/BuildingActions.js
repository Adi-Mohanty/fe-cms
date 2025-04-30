import apiService from "../service/Service";
import config from "../config/config";

export const buildingAction = {
  createBuilding,
};

async function createBuilding(buildingData) {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.createBuilding;

    const payload = {
      companyId: 1, // Hardcoded as per your backend
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

    if (response) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Failed to create building:", err);
    return null;
  }
}
