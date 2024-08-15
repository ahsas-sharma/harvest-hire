const CategoryItem = ({
  category,
  handleCategoryClick,
  isSelected,
  isHome,
}) => {
  return (
    <div className="carousel-item">
      <button
        onClick={() => handleCategoryClick(category.label)}
        className={`group relative m-10 flex ${
          isHome ? "h-96 w-72" : "h-24 w-48"
        } ${
          isSelected
            ? "border-2 border-yellow-400 shadow-md shadow-yellow-400"
            : "border-4 border-transparent shadow-sm"
        } rounded-2xl sm:mx-auto sm:max-w-lg overflow-hidden`}
      >
        <div className="z-10 h-full w-full overflow-hidden rounded-xl borderopacity-100 transition duration-300 ease-in-out group-hover:opacity-100 dark:opacity-70">
          <img
            src={category.image}
            className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
            alt={category.name}
          />{" "}
          <div
            className={`absolute inset-0 bg-gray-900  ${
              isSelected
                ? "bg-opacity-70"
                : "bg-opacity-50 group-hover:bg-opacity-10"
            } transition duration-300`}
          ></div>
        </div>
        <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
          <h1
            className={`z-10 mt-3 leading-tight text-white w-3/4 shadow-lg text-left ${
              isHome ? "text-3xl font-semibold" : "text-md font-bold "
            }`}
          >
            {category.name}
          </h1>
        </div>
      </button>
    </div>
  );
};

export default CategoryItem;
