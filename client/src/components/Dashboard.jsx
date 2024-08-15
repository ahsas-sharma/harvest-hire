import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import DashboardProfile from "./DashboardProfile";
import DashboardRequestsContainer from "./DashboardRequestsContainer";
import DashboardEquipments from "./DashboardEquipments";
import axios from "axios";
import CONFIG from "../config/config";

export default function Dashboard() {
  const { user, isAdmin, getUserData } = useAuth();
  const [activeComponent, setActiveComponent] = useState("Profile");
  const [isLoading, setIsLoading] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const requestBaseURL = `${CONFIG.VITE_SERVER_BASE_URL}/api/request/`;

  const getUserRequests = async () => {
    setIsLoading(true);

    try {
      let token = JSON.parse(window.localStorage.getItem("token"));
      if (token == "") {
        console.log("No token found");
        return;
      }
      let url = isAdmin ? requestBaseURL : requestBaseURL + "user";
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserRequests(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateRequestState = (requestId, newStatus) => {
    let statusValues = {
      accept: "Accepted",
      reject: "Rejected",
      returned: "Returned",
    };
    setUserRequests(
      userRequests.map((request) => {
        if (request._id === requestId) {
          request.status = statusValues[newStatus];
        }
        return request;
      })
    );
  };

  useEffect(() => {
    if (!user) {
      getUserData;
    }
  }, []);

  useEffect(() => {
    // Only call getUserRequests if isAdmin is not null or undefined
    if (isAdmin !== undefined && isAdmin !== null) {
      getUserRequests();
    }
  }, [isAdmin]);

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
          <div className="w-1/4 bg-gray-200 p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              {isAdmin ? "🔓 Admin Dashboard" : "👨🏻‍🌾 User Dashboard"}
            </h2>
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${
                    activeComponent === "Profile"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setActiveComponent("Profile")}
                >
                  Profile
                </button>
              </li>

              {isAdmin && (
                <li>
                  <button
                    className={`w-full text-left py-2 px-4 rounded ${
                      activeComponent === "Equipments"
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    onClick={() => setActiveComponent("Equipments")}
                  >
                    Equipments
                  </button>
                </li>
              )}

              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${
                    activeComponent === "All Requests"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setActiveComponent("All Requests")}
                >
                  All Requests{" "}
                  <span className="badge font-semibold ml-1 bg-green-700 text-white">
                    {userRequests.length}
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${
                    activeComponent === "Active Requests"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setActiveComponent("Active Requests")}
                >
                  Active Requests{" "}
                  <span className="badge font-semibold ml-1 bg-green-700 text-white">
                    {
                      userRequests.filter(
                        (request) =>
                          request.status == "Requested" ||
                          request.status == "Accepted" ||
                          request.status == "Overdue"
                      ).length
                    }
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left py-2 px-4 rounded ${
                    activeComponent === "Closed Requests"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setActiveComponent("Closed Requests")}
                >
                  Closed Requests{" "}
                  <span className="badge font-semibold ml-1 bg-green-700 text-white">
                    {
                      userRequests.filter(
                        (request) =>
                          request.status == "Rejected" ||
                          request.status == "Returned"
                      ).length
                    }
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main className="flex-1">{/* Main area */}</main>
      </div>
    </div>
  );
}
