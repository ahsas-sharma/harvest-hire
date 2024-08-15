import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import CONFIG from "../config/config";
import DashboardEquipmentCard from "./DashboardEquipmentCard";
import EquipmentModal from "./EquipmentModal";
import toast, { Toaster } from "react-hot-toast";

const DashboardEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [activeEquipment, setActiveEquipment] = useState(null);

  // ------------------ MODAL
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setActiveEquipment(null);
  };

  const updateEquipmentState = (itemId, newItem, shouldDelete = false) => {
    if (shouldDelete) {
      setEquipments((currentEquipments) =>
        currentEquipments.filter((equipment) => equipment._id !== itemId)
      );
    } else if (itemId && !shouldDelete) {
      setEquipments((currentEquipments) =>
        currentEquipments.map((equipment) =>
          equipment._id === itemId ? newItem : equipment
        )
      );
    } else {
      setEquipments((currentEquipments) => [newItem, ...currentEquipments]);
    }
  };

  const getEquipments = useCallback(async () => {
    // setIsLoading(true);
    try {
      let token = JSON.parse(window.localStorage.getItem("token"));
      if (token == "") {
        console.log("No token found");
        return;
      }
      let response = await axios.get(
        `${CONFIG.VITE_SERVER_BASE_URL}/api/equipment/allitems`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEquipments(response.data);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  }, []);

  const createUpdateDeleteEquipment = async (equipment, remove = false) => {
    try {
      let token = JSON.parse(window.localStorage.getItem("token"));
      if (token == "") {
        console.log("No token found");
        return;
      }

      if (remove) {
        // NOTE: In this case equipment is the ID not the object
        let response = await axios.delete(
          `${CONFIG.VITE_SERVER_BASE_URL}/api/equipment/${equipment}/delete`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        updateEquipmentState(equipment, null, true);
        toast.success("Equipment deleted successfully!");
        return;
      }

      if (equipment._id) {
        console.log(`Editing old equipment`);
        let response = await axios.patch(
          `${CONFIG.VITE_SERVER_BASE_URL}/api/equipment/${equipment._id}/update`,
          equipment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        updateEquipmentState(equipment._id, response.data, false);
        toast.success("Updated successfully!");
      } else {
        console.log(`Creating a new equipment`);
        let response = await axios.post(
          `${CONFIG.VITE_SERVER_BASE_URL}/api/equipment/create`,
          equipment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        updateEquipmentState(null, response.data, false);
        toast.success("Created a new equipment successfully!");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const onEdit = (equipmentId) => {
    setActiveEquipment(equipments.find((item) => item._id == equipmentId));
    handleOpen();
  };

  const onDelete = (equipmentId) => {
    setActiveEquipment(equipments.find((item) => item._id == equipmentId));
    createUpdateDeleteEquipment(equipmentId, true);
  };

  useEffect(() => {
    getEquipments();
  }, []);

  const handleFormSubmit = async (data) => {
    await createUpdateDeleteEquipment(data);
    handleClose();
  };

  return (
    <div>
      <Toaster />
      <EquipmentModal
        onSubmit={handleFormSubmit}
        equipment={activeEquipment}
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />

      <div className="grid auto-cols-auto md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 mr-3 ">
        {equipments.map((item, index) => (
          <DashboardEquipmentCard
            key={index}
            equipment={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardEquipments;
