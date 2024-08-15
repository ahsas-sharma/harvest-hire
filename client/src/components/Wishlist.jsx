import { useAuth } from "./AuthContext";
import EquipmentCard from "./EquipmentCard";
import { useEffect, useState } from "react";
import axios from "axios";
import CONFIG from "../config/config";
import { Link } from "react-router-dom";
const Wishlist = () => {
  const { user, getUserData } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist();
  }, [user]);

  const getWishlist = async () => {
    let token = JSON.parse(window.localStorage.getItem("token"));
    if (!token) {
      console.log("No token found");
      return;
    }
    try {
      let response = await axios.get(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/user/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  const wishlistButtonHandler = async (equipmentId) => {
    let token = JSON.parse(window.localStorage.getItem("token"));

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      let response = await axios.delete(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/user/wishlist/remove/${equipmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setWishlist((wishlist) =>
        wishlist.filter((equipment) => equipment._id !== equipmentId)
      );
      getUserData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-96 ">
      <h2 className="text-2xl font-bold text-gray-700 m-4 text-center">
        🪄 Wishlist
      </h2>{" "}
      {wishlist.length === 0 ? (
        <p className="text-gray-700 mx-20 text-sm text-center">
          There are no items in your wishlist. Click on the - Add to Wishlist -
          button to add an equipment your wishlist.{" "}
          <Link className="text-green-700 font-semibold" to="/equipments">
            Browse Equipments
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-3">
          {wishlist.map((equipment) => (
            <EquipmentCard
              key={equipment._id}
              equipment={equipment}
              inWishlist={user ? user.wishlist.includes(equipment._id) : false}
              wishlistButtonHandler={wishlistButtonHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
