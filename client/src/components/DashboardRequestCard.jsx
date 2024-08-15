import { format } from "date-fns";
import { useEffect } from "react";

const DashboardRequestCard = ({ rentalRequest, isAdmin, onUpdateStatus }) => {
  const {
    equipmentId,
    status,
    startDate,
    endDate,
    totalDays,
    totalPrice,
    userId,
  } = rentalRequest;

  const statusStyles = {
    InCart: "border-yellow-500 bg-yellow-50 text-yellow-800",
    Requested: "border-blue-500 bg-blue-50 text-blue-800",
    Accepted: "border-green-500 bg-green-50 text-green-800",
    Rejected: "border-red-500 bg-red-50 text-red-800",
    Returned: "border-gray-500 bg-gray-50 text-gray-800",
    Overdue: "border-orange-500 bg-orange-50 text-orange-800",
  };

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(rentalRequest._id, newStatus);
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-lg shadow-md m-4 ${statusStyles[status]}`}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{equipmentId.name}</div>

        <div className="font-semibold text-lg">Status: {status}</div>
      </div>
      <p className="text-sm text-gray-600">{equipmentId.description}</p>
      <div className="mt-2">
        <div className="text-sm">Rental Period</div>
        <div className="text-md font-semibold">
          {format(new Date(startDate), "dd MMM yy")} to{" "}
          {format(new Date(endDate), "dd MMM yy")}
        </div>
      </div>
      <div className="mt-2">
        <div className="text-sm">Total Days</div>
        <div className="text-md font-semibold">{totalDays}</div>
      </div>
      <div className="mt-2">
        <div className="text-sm">Total Price</div>
        <div className="text-md font-semibold">Rs. {totalPrice}</div>
      </div>
      {isAdmin && userId && (
        <div className="mt-2">
          <div className="text-sm">Requested By: </div>
          <div className="text-md font-semibold">{userId.name}</div>
        </div>
      )}

      {isAdmin && (
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => handleStatusChange("accept")}
            className="btn btn-sm bg-green-500 text-white hover:bg-green-700 disabled:opacity-50"
            disabled={status !== "Requested"}
          >
            Accept
          </button>
          <button
            onClick={() => handleStatusChange("reject")}
            className="btn btn-sm bg-red-500 text-white hover:bg-red-700 disabled:opacity-50"
            disabled={status !== "Requested"}
          >
            Reject
          </button>
          <button
            onClick={() => handleStatusChange("returned")}
            className="btn btn-sm bg-blue-500 text-white hover:bg-blue-800 disabled:opacity-50"
            disabled={!(status === "Accepted" || status === "Overdue")}
          >
            Mark as Returned
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardRequestCard;
