import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import DashboardProfile from "./DashboardProfile";
import DashboardRequestsContainer from "./DashboardRequestsContainer";
import DashboardEquipments from "./DashboardEquipments";
import axios from "axios";
import CONFIG from "../config/config";

const UserDashboard = () => {
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

  const renderContent = () => {
    switch (activeComponent) {
      case "Profile":
        return <DashboardProfile user={user} />;
      case "Equipments":
        return <DashboardEquipments />;
      case "All Requests":
        return isLoading ? (
          <div>Loading...</div>
        ) : (
          <DashboardRequestsContainer
            requests={userRequests}
            isAdmin={isAdmin}
            updateRequestState={updateRequestState}
          />
        );
      case "Active Requests":
        return isLoading ? (
          <div>Loading...</div>
        ) : (
          <DashboardRequestsContainer
            isAdmin={isAdmin}
            requests={userRequests.filter(
              (request) =>
                request.status == "Requested" ||
                request.status == "Accepted" ||
                request.status == "Overdue"
            )}
            updateRequestState={updateRequestState}
          />
        );
      case "Closed Requests":
        return isLoading ? (
          <div>Loading...</div>
        ) : (
          <DashboardRequestsContainer
            isAdmin={isAdmin}
            requests={userRequests.filter(
              (request) =>
                request.status == "Rejected" || request.status == "Returned"
            )}
          />
        );
      default:
        return <div>Select an option from the menu.</div>;
    }
  };

  return (
    user && (
      <div className="flex flex-grow min-h-full">
        <div className="w-1/4 p-6 space-y-4 sticky">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            {isAdmin ? "🔓 Admin Dashboard" : "👨🏻‍🌾 User Dashboard"}
          </h2>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded text-sm font-semibold ${
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
                  className={`w-full text-left py-2 px-4 rounded text-sm font-semibold  ${
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
                className={`w-full text-left py-2 px-4 rounded  text-sm font-semibold  ${
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
                className={`w-full text-left py-2 px-4 rounded text-sm font-semibold ${
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
                className={`w-full text-left py-2 px-4 rounded text-sm font-semibold  ${
                  activeComponent === "Closed Requests"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setActiveComponent("Closed Requests")}
              >
                Closed Requests{" "}
                <span className="badge ml-1 bg-green-700 text-white  ">
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
        <div className="w-3/4 p-6 bg-gray-50 min-h-[75vh]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {activeComponent}
          </h2>
          <div className="p-4 bg-white shadow-md rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    )
  );
};

export default UserDashboard;
