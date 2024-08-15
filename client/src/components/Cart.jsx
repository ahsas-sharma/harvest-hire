import { useAuth } from "./AuthContext";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../config/config";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const Cart = () => {
  const { user, getUserData } = useAuth();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      getUserData();
    }
    getCartItems();
  }, [user]);

  const successNotification = () =>
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-green-50 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-green-400"
                />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-green-800">
                  Order completed
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Your request has been submitted successfully. Our team will
                    review it and revert back to you shortly. You can track the
                    status of your request in your Dashboard under Active Items.
                    Thank you. Happy Farming!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Close
            </button>
          </div>
        </div>
      ),
      { position: "bottom-center", duration: 20000 }
    );

  const handleRemove = async (item) => {
    let token = JSON.parse(window.localStorage.getItem("token"));
    if (token === "") {
      console.log("No token found");
      return;
    }
    try {
      await axios.delete(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/request/${item._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart((currentCart) =>
        currentCart.filter((request) => request._id !== item._id)
      );
      toast.success("Removed item from cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleSubmit = async (item) => {
    let token = JSON.parse(window.localStorage.getItem("token"));
    if (token === "") {
      console.log("No token found");
      return;
    }

    try {
      await axios.patch(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/request/${item._id}/submit`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart((currentCart) =>
        currentCart.filter((request) => request._id !== item._id)
      );
      successNotification();
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit request.");
    }
  };

  const getCartItems = async () => {
    let token = JSON.parse(window.localStorage.getItem("token"));
    if (token === "") {
      console.log("No token found");
      return;
    }
    try {
      let response = await axios.get(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/request/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let inCart = response.data.filter((item) => item.status === "InCart");
      setCart(inCart);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        🛒 Rental Cart
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          User Information
        </h3>
        {user ? (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Phone:</strong> {user.phoneNo}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Loading user information...</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 min-h-72">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Cart Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cart.length > 0 ? (
            cart.map((item, idx) => (
              <CartItem
                key={idx}
                equipmentName={item.equipmentId.name}
                startDate={item.startDate}
                endDate={item.endDate}
                numberOfDays={item.totalDays}
                totalRent={item.totalPrice}
                onRemove={() => handleRemove(item)}
                onSubmit={() => handleSubmit(item)}
              />
            ))
          ) : !isLoading ? (
            <p className="text-gray-500">There are no items in the cart.</p>
          ) : (
            <p className="text-center text-gray-500">Loading cart items...</p>
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Cart;
