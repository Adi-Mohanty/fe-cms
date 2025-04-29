import apiService from "../service/Service";
import config from "../config/config";

export const roomListAction = {
  createRoomType,
  getRoomTypes,
};

async function createRoomType(formData) {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.addRoomType;

    const payload = {
      name: formData.roomType,
      rentPrice: Number(formData.monthlyRent),
      maintenanceCost: Number(formData.maintenanceAmount),
      securityDeposit: Number(formData.securityDeposit),
      advancePayment: Number(formData.advance),
      companyId: 1, // Hardcoded for now
    };

    const response = await apiService.post(apiEndPoint, payload);

    if (response) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Failed to create room type:", err);
    return null;
  }
}

async function getRoomTypes() {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.getRoomList;
    const response = await apiService.get(apiEndPoint);

    if (response) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Failed to fetch room types:", err);
    return [];
  }
}
