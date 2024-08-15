import { Link } from "react-router-dom";

const DashboardEquipmentCard = ({ equipment, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-50 shadow-sm rounded-lg overflow-hidden border border-gray-200 w-full p-4 m-2 flex flex-col">
      <h3 className="text-lg font-semibold tracking-tight text-gray-800 mb-2">
        {equipment.name}
      </h3>
      <p className="text-gray-600 mb-4 tracking-tight">
        {equipment.description}{" "}
      </p>
      <div className="flex items-center mb-4">
        <div className="text-sm  text-gray-700 mr-1">Price - </div>
        <div className=" text-gray-800 font-xl font-semibold">
          Rs.{equipment.price} per day
        </div>
      </div>
      <div className="flex items-center  mb-4">
        <div className="text-sm text-gray-700 font-medium mr-1">
          Category -{" "}
        </div>
        <div className="text-gray-800 font-semibold">{equipment.category}</div>
      </div>
      <div className="mb-4">
        <div className="text-sm text-gray-700 font-medium mb-1">
          Features -{" "}
        </div>
        <ul className="list-disc ml-4  text-gray-800">
          {equipment.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-normal mb-4">
        <div
          className={`text-sm ${
            equipment.isAvailable
              ? "text-green-900 bg-green-200 px-2 rounded-md overflow-hidden"
              : "text-red-900 bg-red-200 px-2 rounded-md overflow-hidden"
          }`}
        >
          {equipment.isAvailable ? "Available" : "Not Available"}
        </div>
      </div>
      <div className="flex justify-end mt-auto gap-2">
        <button
          onClick={() => onEdit(equipment._id)}
          // className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-blue-600 shadow-sm mr-2"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-50 px-2  text-base font-medium text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(equipment._id)}
          // className="bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600 shadow-sm"
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-50 px-8 py-3 text-base font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DashboardEquipmentCard;
