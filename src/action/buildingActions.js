import { buildingService } from "../service/buildingService";

export const buildingActions = {
  fetchAllBuildings,
  fetchBuildingById,
  createBuilding,
  modifyBuilding,
};

async function fetchAllBuildings() {
  try {
    const data = await buildingService.getAllBuildings();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function fetchBuildingById(id) {
  try {
    const data = await buildingService.getBuildingById(id);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function createBuilding(payload) {
  try {
    const data = await buildingService.addBuilding(payload);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function modifyBuilding(payload) {
  try {
    const data = await buildingService.updateBuilding(payload);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
