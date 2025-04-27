import managerConfig from "../config/managerConfig";

// Helper functions to manage localStorage operations
const getManagersFromStorage = () => {
  const data = localStorage.getItem(managerConfig.storageKey);
  return data ? JSON.parse(data) : [];
};

const saveManagersToStorage = (managers) => {
  localStorage.setItem(managerConfig.storageKey, JSON.stringify(managers));
};

export const managerService = {
  // Get all managers from storage
  getAllManagers: () => {
    return new Promise((resolve, reject) => {
      const managers = getManagersFromStorage();
      if (!managers || managers.length === 0) {
        reject({ status: 500, message: "No managers found in storage" });
      } else {
        resolve(managers);
      }
    });
  },

  // Add a new manager to storage
  addManager: (newManager) => {
    return new Promise((resolve, reject) => {
      if (!newManager || !newManager.companyName) {
        return reject({ status: 400, message: "Invalid manager data" });
      }

      const managers = getManagersFromStorage();

      // Ensure onboardDate is in correct format (YYYY-MM-DD)
      const onboardDate = newManager.onboardDate
        ? new Date(newManager.onboardDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      const managerWithId = {
        ...newManager,
        id: Date.now().toString(),
        onboardDate,
      };

      // Add the new manager and save to localStorage
      const updated = [...managers, managerWithId];
      saveManagersToStorage(updated);

      resolve(managerWithId);
    });
  },

  // Get a manager by ID
  getManagerById: (id) => {
    return new Promise((resolve, reject) => {
      const managers = getManagersFromStorage();
      const manager = managers.find((m) => m.id === id);
      if (manager) {
        resolve(manager);
      } else {
        reject({ status: 404, message: "Manager not found" });
      }
    });
  },

  // Update an existing manager
  updateManager: (updatedManager) => {
    return new Promise((resolve, reject) => {
      if (!updatedManager || !updatedManager.id) {
        return reject({ status: 400, message: "Invalid manager data" });
      }

      const managers = getManagersFromStorage();
      const index = managers.findIndex((m) => m.id === updatedManager.id);
      if (index === -1) {
        reject({ status: 404, message: "Manager not found" });
      } else {
        // Ensure onboardDate is in correct format when updating
        const onboardDate = updatedManager.onboardDate
          ? new Date(updatedManager.onboardDate).toISOString().split("T")[0]
          : updatedManager.onboardDate;

        managers[index] = {
          ...updatedManager,
          onboardDate,
        };

        saveManagersToStorage(managers);
        resolve(managers[index]);
      }
    });
  },
};
