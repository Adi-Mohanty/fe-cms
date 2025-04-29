import apiService from "../service/Service";
import config from "../config/config";

export const buildingActions = {
  getBuildingById,
  addBuilding,
  updateBuilding,
  getAllBuildings, // New action for fetching all buildings
};

async function getBuildingById(id) {
  try {
    const apiEndPoint = `${config.baseUrl}/building/${id}`;
    const response = await apiService.get(apiEndPoint);
    if (response) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Function to get all buildings (modified to POST request)
async function getAllBuildings(adminId) {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.getAllBuildings;

    const payload = {
      adminId: adminId, // Pass adminId as requested
    };

    const response = await apiService.post(apiEndPoint, payload);
    if (response) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addBuilding(formData) {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.addBuilding;

    const payload = {
      builderId: 3, // Can be dynamic if needed
      buildingName: formData.name,
      city: formData.address.city,
      adminId: 21, // Can be dynamic if needed
      state: formData.address.state,
      latitude: formData.location.lat,
      longitude: formData.location.lng,
      landMark: formData.address.landmark,
      pinCode: formData.address.pincode,
      userDTO: {
        id: null,
        name: formData.manager.name,
        email: formData.manager.email,
        password: formData.manager.password,
        phone: formData.manager.phone,
      },
      floorDTOS: formData.floorDetails.map((floor, index) => ({
        id: null,
        floorNo: index + 1,
        totalRooms: floor.rooms,
        rentPerRoom: floor.rent,
        buildingId: null,
      })),
    };

    const response = await apiService.post(apiEndPoint, payload);
    if (response) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateBuilding(id, formData) {
  try {
    const apiEndPoint = config.baseUrl + config.apiEndpoint.updateBuilding;

    const payload = {
      id, // Include id while updating
      builderId: 3,
      buildingName: formData.name,
      city: formData.address.city,
      adminId: 21,
      state: formData.address.state,
      latitude: formData.location.lat,
      longitude: formData.location.lng,
      landMark: formData.address.landmark,
      pinCode: formData.address.pincode,
      userDTO: {
        id: formData.manager.id || null,
        name: formData.manager.name,
        email: formData.manager.email,
        password: formData.manager.password,
        phone: formData.manager.phone,
      },
      floorDTOS: formData.floorDetails.map((floor, index) => ({
        id: floor.id || null,
        floorNo: index + 1,
        totalRooms: floor.rooms,
        rentPerRoom: floor.rent,
        buildingId: id, // While updating, you may need to assign buildingId
      })),
    };

    const response = await apiService.post(apiEndPoint, payload);
    if (response) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
