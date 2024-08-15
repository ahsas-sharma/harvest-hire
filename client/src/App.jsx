// import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Equipments from "./components/Equipments";
import EquipmentDetail from "./components/EquipmentDetail";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoutes from "./components/PrivateRoutes";
import Layout from "./components/Layout";
import UserDashboard from "./components/UserDashboard";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="flex flex-col min-h-screen max-w-full">
      <div className="flex-grow">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/equipments/:id" element={<EquipmentDetail />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </Layout>
      </div>
    </div>
  );
}

export default App;
