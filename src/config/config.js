const config = Object.freeze({
  baseUrl: "http://192.168.12.51:9000",
  apiEndpoint: {
    addRoomType: "/api/room-type/create",
    getRoomList: "/api/room-type/list/1",
    createBuilding: "/api/create/building",
    getAllBuildings: "/api/get/all/buildings?companyId=1",
    createManager: "/api/assign/manager",
    getManagersByRole: "/api/users/by/role", // UPDATED
  },
});

export default config;
