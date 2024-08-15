import { Link } from "react-router-dom";

function EquipmentCard({ equipment, inWishlist, wishlistButtonHandler }) {
  const handleWishlistClick = () => {
    wishlistButtonHandler(equipment._id);
  };

  return (
    <div className="max-w-md rounded-lg overflow-hidden bg-white shadow-lg border border-gray-200 m-2 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <img
        src={equipment.imageUrl}
        alt={equipment.name}
        className="w-full h-48 object-cover"
      />
      <div className="flex-grow px-6 py-4">
        <div className="font-bold text-xl mb-2 text-green-900">
          {equipment.name}
          {equipment.isAvailable ? (
            <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ml-2">
              Available
            </span>
          ) : (
            <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ml-2">
              Not Available
            </span>
          )}
        </div>

        <p className="text-gray-700 text-base mb-2">{equipment.description}</p>
        <p className="text-gray-900 font-semibold">
          Rs. {equipment.price} per day
        </p>
      </div>
      <div className="px-6 py-4 mt-auto flex items-center justify-between">
        <button
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            inWishlist
              ? "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 text-center"
              : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 text-center"
          }`}
          onClick={handleWishlistClick}
        >
          {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
        <Link
          to={`/equipments/${equipment._id}`}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-green-800 text-white border border-green-600 hover:bg-green-700 transition-all duration-300 ml-2 text-center"
          state={{ from: "equipments", equipment: equipment }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EquipmentCard;
