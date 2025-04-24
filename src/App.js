import "./App.css";
import Navbar from "./components/Navbar";
import AddUpdateBuildingForm from "./pages/admin/AddUpdateBuildingForm";
import AdminBuildingList from "./pages/admin/AdminBuildingList";

function App() {
  return (
    <>
      <Navbar />
      <AdminBuildingList />
      <AddUpdateBuildingForm />
    </>
  );
}

export default App;
