import { useJsApiLoader } from "@react-google-maps/api";
import React, { createContext, useContext } from "react";

const MapContext = createContext();

export const MapLoaderProvider = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
    libraries: ["places"],
  });

  return (
    <MapContext.Provider value={{ isLoaded }}>{children}</MapContext.Provider>
  );
};

export const useMapLoader = () => useContext(MapContext);
