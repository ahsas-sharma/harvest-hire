import React from "react";

const DashboardProfile = ({ user }) => {
  return (
    <div className="max-w-3xl mx-2 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Name</h3>
          <p className="text-lg text-gray-900">{user.name}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Phone Number</h3>
          <p className="text-lg text-gray-900">{user.phoneNo}</p>
          <p
            className={`text-sm ${
              user.isPhoneVerified ? "text-green-500" : "text-red-500"
            }`}
          >
            {user.isPhoneVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Email</h3>
          <p className="text-lg text-gray-900">{user.email}</p>
          <p
            className={`text-sm ${
              user.isEmailVerified ? "text-green-500" : "text-red-500"
            }`}
          >
            {user.isEmailVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Government ID</h3>
          <p className="text-lg text-gray-900">{user.govtID}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">User Role</h3>
          <p className="text-lg text-gray-900">{user.role}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">
            Account Created At:
          </h3>
          <p className="text-lg text-gray-900">
            {new Date(user.created_at).toLocaleString()}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">
            Last Updated At:
          </h3>
          <p className="text-lg text-gray-900">
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
