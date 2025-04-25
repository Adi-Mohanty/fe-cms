import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddUpdateBuildingForm from "./pages/admin/AddUpdateBuildingForm";
import AdminBuildingList from "./pages/admin/AdminBuildingList";
import BuildingDetails from "./pages/admin/BuildingDetails";
import ManagerDashboard from "./pages/manager/ManagerDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/admin" element={<AdminBuildingList />} />
        <Route path="/building/:id" element={<BuildingDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
