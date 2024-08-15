import axios from "axios";
import CONFIG from "../config/config";
import DashboardRequestCard from "./DashboardRequestCard";

const DashboardRequestsContainer = ({
  requests,
  isAdmin,
  updateRequestState,
}) => {
  const updateRequestStatus = async (requestId, newStatus) => {
    let url = `${CONFIG.VITE_SERVER_BASE_URL}/api/request/${requestId}/${newStatus}`;
    console.log(
      `Updating status of request: ${requestId} to ${newStatus} at url : ${url}`
    );

    try {
      let token = JSON.parse(window.localStorage.getItem("token"));
      if (token == "") {
        console.log("No token found");
        return;
      }
      let response = await axios.patch(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/request/${requestId}/${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateRequestState(requestId, newStatus);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (Array.isArray(requests) && requests.length > 0) {
    return (
      <div>
        {requests.map((request, index) => (
          <DashboardRequestCard
            key={index}
            rentalRequest={request}
            isAdmin={isAdmin}
            onUpdateStatus={updateRequestStatus}
          />
        ))}
      </div>
    );
  } else {
    // Render a message or placeholder when there are no requests
    return <div>No requests found.</div>;
  }
};

export default DashboardRequestsContainer;
