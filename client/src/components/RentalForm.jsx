import React, { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import axios from "axios";
import CONFIG from "../config/config";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const RentalForm = ({ equipment }) => {
  let today = format(new Date(), "yyyy-MM-dd");
  let tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [totalDays, setTotalDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const { user } = useAuth();

  const calculateTotalPrice = () => {
    setTotalPrice(totalDays * equipment.price);
  };

  const calculateTotalDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    setTotalDays(days);
  };

  useEffect(() => {
    calculateTotalDays();
  }, [startDate, endDate]);

  useEffect(() => {
    calculateTotalPrice();
  }, [totalDays]);

  const addToCartHandler = async () => {
    let newBookingRequest = {
      equipmentId: equipment._id,
      startDate: startDate,
      endDate: endDate,
      totalDays: totalDays,
      totalPrice: totalPrice,
    };

    let token = JSON.parse(window.localStorage.getItem("token"));
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      let response = await axios.post(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/request/create`,
        newBookingRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className=" mt-6 border-t border-gray-200 container mx-auto p-4">
      <form className="w-full">
        <h2 className="mt-2 mb-2 text-xl font-semibold leading-9 tracking-tight text-gray-900">
          Rental Request Form
        </h2>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">End Date</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Total Days</span>
          </label>
          <input
            type="number"
            value={totalDays}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Total Price</span>
          </label>
          <input
            type="number"
            value={totalPrice.toFixed(2)}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <button
            type="button"
            onClick={addToCartHandler}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Add to Cart
          </button>
          <button
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-50 px-8 py-3 text-base font-medium text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50 mt-2"
            onClick={() => navigate("/cart")}
          >
            View Cart
          </button>

          <Toaster />
        </div>
      </form>
    </div>
  );
};

export default RentalForm;
