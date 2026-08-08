import { useDispatch } from "react-redux";
import { categoriesIcons } from "../constants/categoriesIcon.constant";
import { selectCategory } from "../features/categarySlice";
import type { AppDispatch } from "../redux/store";

const CategoryFilter = () => {
   const dispatch = useDispatch<AppDispatch>();
   const handleOnCLick = (name = "All") => 
    {
      dispatch(selectCategory(name));
    };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categoriesIcons.map((category) => {
        const Icon = category.icon;

        return (
          <button
            key={category.name}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700"
            onClick={() => handleOnCLick(category.name)}
          >
            <Icon size={17} />
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;