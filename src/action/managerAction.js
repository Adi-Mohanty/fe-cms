import { managerService } from "../service/managerService";

export const managerActions = {
  fetchAllManagers,
  createManager,
  fetchManagerById,
  updateManager,
};

async function fetchAllManagers() {
  try {
    const data = await managerService.getAllManagers();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function createManager(payload) {
  try {
    const data = await managerService.addManager(payload);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function fetchManagerById(id) {
  try {
    const data = await managerService.getManagerById(id);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function updateManager(payload) {
  try {
    const data = await managerService.updateManager(payload);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
