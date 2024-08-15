import React from "react";

const RentalPolicy = () => {
  const policyText = `
    Our rental policy ensures that you have a seamless experience from start to finish.
    All equipment must be returned in the same condition as it was received. Rental
    periods are flexible, with options for daily, weekly, or monthly rentals. In case of
    any malfunction during the rental period, please contact our support team
    immediately. Late returns may incur additional charges. We recommend
    inspecting the equipment before use to ensure it meets your needs and is in
    proper working condition.
  `;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Rental Policy
      </h2>
      <p className="text-gray-700 leading-relaxed">{policyText}</p>
    </div>
  );
};

export default RentalPolicy;
