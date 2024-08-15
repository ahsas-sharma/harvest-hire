import EquipmentCard from "./EquipmentCard";
import { useAuth } from "./AuthContext";
import axios from "axios";
import CONFIG from "../config/config";
import { useNavigate } from "react-router-dom";

const FilteredEquipments = ({ equipments, selectedCategory }) => {
  const { user, getUserData } = useAuth();
  const navigate = useNavigate();

  let filteredEquipments = [];

  selectedCategory == "ALL"
    ? (filteredEquipments = equipments)
    : (filteredEquipments = equipments.filter(
        (equipment) => equipment.category === selectedCategory
      ));

  const wishlistButtonHandler = async (equipmentId) => {
    await toggleWishlist(equipmentId);
  };

  const toggleWishlist = async (equipmentId) => {
    let token = JSON.parse(window.localStorage.getItem("token"));

    if (!token) {
      console.log("No token found");
      navigate("/login");
      return;
    }

    try {
      if (user.wishlist.includes(equipmentId)) {
        await axios.delete(
          `${CONFIG.VITE_SERVER_BASE_URL}/api/user/wishlist/remove/${equipmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        let response = await axios.post(
          `${CONFIG.VITE_SERVER_BASE_URL}/api/user/wishlist/add/${equipmentId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      }
      getUserData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="px-6 lg:px-8 mx-auto text-md font-medium leading-9 tracking-tight text-gray-900">
        Showing{" "}
        <span className="text-green-700 font-bold">
          {filteredEquipments.length}
        </span>{" "}
        equipments{" "}
        {selectedCategory === "ALL"
          ? "from all categories"
          : `from selected category`}
      </h2>

      <div className="grid grid-cols-3 gap-2 p-4">
        {filteredEquipments.length > 0 ? (
          filteredEquipments.map((equipment, index) => (
            <EquipmentCard
              key={index}
              equipment={equipment}
              inWishlist={user ? user.wishlist.includes(equipment._id) : false}
              wishlistButtonHandler={wishlistButtonHandler}
            />
          ))
        ) : (
          <span className="loading loading-spinner text-green-800 text-center loading-lg"></span>
        )}
      </div>
    </div>
  );
};
export default FilteredEquipments;
