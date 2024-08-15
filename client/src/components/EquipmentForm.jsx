import React, { useState, useEffect } from "react";

const EquipmentForm = ({ equipment, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    features: [""],
    category: "HAR",
    isAvailable: true,
    imageUrl: "",
  });

  // Load existing equipment data if provided
  useEffect(() => {
    if (equipment) {
      setFormData({
        _id: equipment._id,
        name: equipment.name || "",
        description: equipment.description || "",
        price: equipment.price || "",
        features: equipment.features || [""],
        category: equipment.category || "",
        isAvailable: equipment.isAvailable || false,
        imageUrl: equipment.imageUrl || "",
      });
    }
  }, [equipment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      features: newFeatures,
    }));
  };

  const handleAddFeature = () => {
    setFormData((prevData) => ({
      ...prevData,
      features: [...prevData.features, ""],
    }));
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      features: newFeatures,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      isAvailable: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-10 top-10"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="text-2xl font-semibold mb-4">
        {equipment ? "Edit Equipment" : "Add New Equipment"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          rows="3"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Price (per day)
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div className="form-control mb-4">
        <label className="label">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option value="HAR">Harvesting Equipment</option>
          <option value="PLT">Plowing and Tilling Equipment</option>
          <option value="PLN">Planting Equipment</option>
          <option value="IRR">Irrigation Equipment</option>
          <option value="FPC">Fertilizing and Pest Control Equipment</option>
          <option value="HAY">Hay and Forage Equipment</option>
          <option value="LEX">Loaders and Excavators</option>
          <option value="MSC">Miscellaneous Equipment</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Features
        </label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mr-2"
              required
            />
            {formData.features.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFeature}
          className="text-green-500 hover:text-green-700 font-semibold"
        >
          Add Feature
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Availability
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Available
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Image URL
        </label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-900"
      >
        {equipment ? "Update Equipment" : "Create Equipment"}
      </button>
    </form>
  );
};

export default EquipmentForm;
