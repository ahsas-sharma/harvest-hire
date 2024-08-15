import { format } from "date-fns";

const CartItem = ({
  equipmentName,
  startDate,
  endDate,
  numberOfDays,
  totalRent,
  onRemove,
  onSubmit,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-lg mx-auto mb-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <div className="mb-6">
        <div className="text-sm text-gray-500">Equipment Name</div>
        <div className="text-xl font-bold text-green-900">{equipmentName}</div>
      </div>
      <div className="mb-6">
        <div className="text-sm text-gray-500">Rental Period</div>
        <div className="text-xl font-bold text-gray-900">
          {format(startDate, "dd MMMM yyy")} <br /> to{" "}
          {format(endDate, "dd MMMM yyy")}
        </div>
      </div>
      <div className="mb-6">
        <div className="text-sm text-gray-500">No. of Days</div>
        <div className="text-xl font-bold text-gray-900">{numberOfDays}</div>
      </div>
      <div className="mb-6">
        <div className="text-sm text-gray-500">Total Rent</div>
        <div className="text-xl font-bold text-gray-900">Rs. {totalRent}</div>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="text-red-600 font-semibold hover:text-red-800 transition-colors duration-200"
          onClick={onRemove}
        >
          Remove from Cart
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-all duration-300"
        >
          Submit Rental Request
        </button>
      </div>
    </div>
  );
};

export default CartItem;
