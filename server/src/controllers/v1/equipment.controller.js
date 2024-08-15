import Equipment from "../../models/equipment.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
//Creating an equipment
export const createEquipment = async (req, res) => {
  try {
    const { name, description, price, features, category, isAvailable } =
      req.body;

    let itemFound = await Equipment.findOne({ name: req.body.name });
    if (itemFound) {
      return res.status(409).send("Equipment Already registered");
    }

    let itemData = {
      name,
      description,
      price,
      features,
      category,
      isAvailable,
    };

    let response = await Equipment.create(itemData);

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//Updating an equipment
export const updateEquipment = async (req, res) => {
  try {
    let updateItem = await Equipment.findById({ _id: req.params.itemId });
    if (!updateItem) {
      return res
        .status(404)
        .send("Equipment not registered.Please check the Equipment Id Again");
    }

    Object.keys(req.body).forEach((key) => {
      if (key in updateItem) {
        updateItem[key] = req.body[key];
      }
    });

    let updatedItem = await updateItem.save();

    res.status(200).send(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//Displaying all Equipments
// TODO: Add category filter
export const displayAllEquipments = async (req, res) => {
  try {
    let equipments = await Equipment.find().sort({ field: "asc", _id: -1 });
    res.status(200).send(equipments);
  } catch (error) {
    console.log(error);
  }
};

// Get equipments by filters
export const getEquipments = asyncHandler(async (req, res) => {
  try {
    // Destructure query parameters from req.query
    const { category, minPrice, maxPrice, isAvailable } = req.query;

    // Build the query object based on provided query parameters
    const query = {};
    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {
        $gte: minPrice ? parseInt(minPrice) : 0,
        $lte: maxPrice ? parseInt(maxPrice) : Infinity,
      };
    }
    if (isAvailable !== undefined) {
      // query.available = !!available;
      query.isAvailable = isAvailableailable;
    }

    // Fetch equipments based on the constructed query
    const equipments = await Equipment.find(query).sort({ createdAt: -1 }); // Sorting by creation date descending
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//Deleting equipment
export const deleteEquipment = async (req, res) => {
  try {
    let removeItem = await Equipment.findById({ _id: req.params.itemId });
    if (!removeItem) {
      return res
        .status(404)
        .send("Equipment not registered. Please check the Equipment Id Again");
    }

    await Equipment.deleteOne({ _id: req.params.itemId });

    res.status(200).send({ msg: "Item deleted" });
  } catch (error) {
    console.log(error);
  }
};
