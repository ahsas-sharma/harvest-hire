import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CONFIG from "../config/config";
import Categories from "./Categories";
import FilteredEquipments from "./FilteredEquipments";

const Equipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const fetchAllEquipments = useCallback(async () => {
    // Step 2: Wrap the function with useCallback
    let response;
    try {
      if (selectedCategory == "ALL") {
        response = await axios.get(
          `${CONFIG.VITE_SERVER_BASE_URL}/api/equipment`
        );
      } else {
        response = await axios.get(
          `${CONFIG.VITE_SERVER_BASE_URL}/api/equipment?category=${selectedCategory}`
        );
      }
      console.log(
        "Finished fetching equipments. Total Count:",
        response.data.length
      );
      setEquipments(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchAllEquipments();
  }, []);

  const selectCategoryHandler = (category) => {
    setSelectedCategory(category);
    console.log("Setting selected category to : ", category);
  };

  return (
    <div className="">
      <Categories
        selectedCategory={selectedCategory}
        selectCategoryHandler={selectCategoryHandler}
        isHome={false}
      />

      <FilteredEquipments
        equipments={equipments}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Equipments;
