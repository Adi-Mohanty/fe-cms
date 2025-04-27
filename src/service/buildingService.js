import buildingConfig from "../config/buildingConfig";

const getBuildingsFromStorage = () => {
  const data = localStorage.getItem(buildingConfig.storageKey);
  return data ? JSON.parse(data) : [];
};

const saveBuildingsToStorage = (buildings) => {
  localStorage.setItem(buildingConfig.storageKey, JSON.stringify(buildings));
};

export const buildingService = {
  getAllBuildings: () => {
    return new Promise((resolve, reject) => {
      const buildings = getBuildingsFromStorage();
      if (!buildings) {
        reject({ status: 500, message: "Failed to load buildings" });
      } else {
        resolve(buildings);
      }
    });
  },

  getBuildingById: (id) => {
    return new Promise((resolve, reject) => {
      const buildings = getBuildingsFromStorage();
      const building = buildings.find((b) => b.id === id);
      if (building) {
        resolve(building);
      } else {
        reject({ status: 404, message: "Building not found" });
      }
    });
  },

  addBuilding: (newBuilding) => {
    return new Promise((resolve, reject) => {
      if (!newBuilding || !newBuilding.name || !newBuilding.manager) {
        return reject({ status: 400, message: "Invalid building data" });
      }

      const buildings = getBuildingsFromStorage();
      const buildingWithId = { ...newBuilding, id: Date.now().toString() };
      const updated = [...buildings, buildingWithId];
      saveBuildingsToStorage(updated);
      resolve(buildingWithId);
    });
  },

  updateBuilding: (updatedBuilding) => {
    return new Promise((resolve, reject) => {
      if (!updatedBuilding || !updatedBuilding.id) {
        return reject({ status: 400, message: "Invalid building data" });
      }

      const buildings = getBuildingsFromStorage();
      const index = buildings.findIndex((b) => b.id === updatedBuilding.id);
      if (index === -1) {
        reject({ status: 404, message: "Building not found" });
      } else {
        buildings[index] = updatedBuilding;
        saveBuildingsToStorage(buildings);
        resolve(updatedBuilding);
      }
    });
  },
};
