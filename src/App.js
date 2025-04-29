import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AdminBuildingList from "./pages/admin/AdminBuildingList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminBuildingList />} />
      </Routes>
    </Router>
  );
}

export default App;
