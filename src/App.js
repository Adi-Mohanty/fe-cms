import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Building from "./components/Building";
import Manager from "./components/Manager";
import RoomList from "./components/RoomList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/building" element={<Building />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/room-list" element={<RoomList />} />
      </Routes>
    </Router>
  );
}

export default App;
