import { useState } from "react";
import EquipmentForm from "./EquipmentForm";

const EquipmentModal = ({
  equipment,
  onSubmit,
  isOpen,
  handleOpen,
  handleClose,
}) => {
  const handleSubmit = (data) => {
    onSubmit(data);
    handleClose();
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          className="btn w-96 rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold border-0 "
          onClick={handleOpen}
        >
          Add New Equipment
        </button>
      </div>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
            <div method="dialog">
              <EquipmentForm
                equipment={equipment}
                onSubmit={handleSubmit}
                onClose={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EquipmentModal;
