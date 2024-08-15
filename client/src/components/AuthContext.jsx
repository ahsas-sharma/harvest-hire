import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../config/config";
const AuthContext = createContext();
import toast, { Toaster, ToastBar } from "react-hot-toast";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const loggedIn = (isAdmin) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
  };

  const loggedOut = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
  };

  const login = async (credentials) => {
    console.log(`Received login request with ${credentials}`);

    try {
      let response = await axios.post(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/user/login`,
        credentials
      );
      const token = response.data.token;
      window.localStorage.setItem("token", JSON.stringify(token));
      setUser(response.data.user);

      // Check if user is admin
      response.data.user.role === "admin" ? loggedIn(true) : loggedIn(false);
      toast.success(`Welcome ${response.data.user.name}!`);
    } catch (error) {
      let errorString = "";
      console.log(error);
      if (error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          errorString += `${err.msg} for ${err.path}`;
        });
      } else {
        errorString = error.response.data;
      }
      toast.error(errorString);
      throw errorString;
    }
  };

  useEffect(() => {
    if (isLoggedIn && !user) {
      getUserData();
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    toast.success("Logged out successfully!");
  };

  const getUserData = async () => {
    let token = JSON.parse(window.localStorage.getItem("token"));
    let response = await axios.get(
      `${CONFIG.VITE_SERVER_BASE_URL}/api/user/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      setUser(response.data.user);
      response.data.user.role == "admin" ? loggedIn(true) : loggedIn(false);
    } else {
      console.log("No data returned");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        user,
        setUser,
        getUserData,
        login,
        logout,
        loggedIn,
        loggedOut,
      }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};
