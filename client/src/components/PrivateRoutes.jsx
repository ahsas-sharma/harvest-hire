import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import CONFIG from "../config/config";

function PrivateRoutes() {
  let [isAuthorized, setIsAuthorized] = useState(true);

  async function verifyToken() {
    let token = JSON.parse(window.localStorage.getItem("token"));
    try {
      let response = await axios.post(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/user/verify/auth`,
        { token }
      );
      setIsAuthorized(response.data.isAuthorized);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return <>{isAuthorized ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRoutes;
