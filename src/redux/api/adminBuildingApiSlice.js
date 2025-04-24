import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

const LOCAL_STORAGE_KEY = "buildingsData";

const getBuildings = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveBuildings = (buildings) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(buildings));
};

export const adminBuildingApiSlice = createApi({
  reducerPath: "adminBuildingApiSlice",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Buildings"],
  endpoints: (builder) => ({
    getAllBuildings: builder.query({
      queryFn: () => {
        const buildings = getBuildings();
        return { data: buildings };
      },
      providesTags: ["Buildings"],
    }),

    getBuildingById: builder.query({
      queryFn: (id) => {
        const buildings = getBuildings();
        const building = buildings.find((b) => b.id === id);
        if (building) {
          return { data: building };
        }
        return { error: { status: 404, message: "Building not found" } };
      },
    }),

    addBuilding: builder.mutation({
      queryFn: (newBuilding) => {
        const buildings = getBuildings();
        const buildingWithId = {
          ...newBuilding,
          id: Date.now().toString(), // Generate a simple unique ID
        };
        const updated = [...buildings, buildingWithId];
        saveBuildings(updated);
        return { data: buildingWithId };
      },
      invalidatesTags: ["Buildings"],
    }),

    updateBuilding: builder.mutation({
      queryFn: (updatedBuilding) => {
        const buildings = getBuildings();
        const index = buildings.findIndex((b) => b.id === updatedBuilding.id);
        if (index === -1) {
          return { error: { status: 404, message: "Building not found" } };
        }
        buildings[index] = updatedBuilding;
        saveBuildings(buildings);
        return { data: updatedBuilding };
      },
      invalidatesTags: ["Buildings"],
    }),
  }),
});

export const {
  useGetAllBuildingsQuery,
  useGetBuildingByIdQuery,
  useAddBuildingMutation,
  useUpdateBuildingMutation,
} = adminBuildingApiSlice;
