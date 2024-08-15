/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loggedIn(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
