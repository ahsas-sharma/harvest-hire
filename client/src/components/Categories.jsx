import CategoryItem from "./CategoryItem";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "View All",
    label: "ALL",
    image:
      "https://images.unsplash.com/photo-1714466630463-877cef3f8a28?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Harvesting Equipment",
    label: "HAR",
    image:
      "https://images.unsplash.com/photo-1507662228758-08d030c4820b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Plowing and Tilling Equipment",
    label: "PLT",
    image:
      "https://plus.unsplash.com/premium_photo-1661818380392-eff80caa5d91?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Planting Equipment",
    label: "PLN",
    image:
      "https://images.unsplash.com/photo-1684677806601-3d34958c6974?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Irrigation Equipment",
    label: "IRR",
    image:
      "https://images.unsplash.com/photo-1692369584496-3216a88f94c1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Fertilizing and Pest Control Equipment",
    label: "FPC",
    image:
      "https://images.unsplash.com/photo-1690986375486-460dc48dd499?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hay and Forage Equipment",
    label: "HAY",
    image:
      "https://images.unsplash.com/photo-1527846884039-a29196edc4c5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Loaders and Excavators",
    label: "LEX",
    image:
      "https://images.unsplash.com/photo-1675600360059-f5585f20e459?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Miscellaneous Equipment",
    label: "MSC",
    image:
      "https://images.unsplash.com/photo-1651844848643-5969245142cc?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Categories = ({ selectCategoryHandler, selectedCategory, isHome }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryShort) => {
    if (isHome) {
      navigate("/equipments");
    }
    selectCategoryHandler(categoryShort);
  };
  const popularCategories = ["PLT", "PLN", "IRR", "FPC", "HAY", "LEX"];

  return (
    <div className="carousel rounded-box mx-auto max-w-full px-6 lg:px-8">
      <div className=" rounded-box flex gap-1 h-full w-full overflow-scroll mb-2">
        {isHome
          ? popularCategories.map((category, index) => (
              <CategoryItem
                key={index}
                category={categories[index]}
                handleCategoryClick={handleCategoryClick}
                isSelected={category == selectedCategory ? true : false}
                isHome={isHome}
              />
            ))
          : categories.map((category, index) => (
              <CategoryItem
                key={index}
                category={category}
                handleCategoryClick={handleCategoryClick}
                isSelected={category.label == selectedCategory ? true : false}
                isHome={isHome}
              />
            ))}
      </div>
    </div>
  );
};

export default Categories;
