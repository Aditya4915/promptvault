import { SlidersHorizontal } from "lucide-react";

import PromptCard from "../components/PromptCard";
import CategoryFilter from "../components/CategoryFilter";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";


const AllPrompts = () => {

  // Get prompts
  const prompts = useSelector((state: RootState) =>state.prompts.prompts);

  // Get global search text from Navbar
  const searchText = useSelector((state: RootState) =>state.prompts.searchText);

  // Get selected category
  const selectedCategory = useSelector((state: RootState) => state.categories.selectedCategory);
  
  // Search filter
  const searchedPrompts = prompts.filter(
    (prompt) => {

      const search =searchText.toLowerCase().trim();
      if (!search) {
        return true;
      }

      return (
        prompt.title
          .toLowerCase()
          .includes(search) ||

        prompt.description
          .toLowerCase()
          .includes(search) ||

        prompt.category
          .toLowerCase()
          .includes(search)
      );
    }
  );


  // Category filter
  const filterPrompts =selectedCategory === "All"? searchedPrompts: searchedPrompts.filter((prompt) =>prompt.category === selectedCategory);


  return (
    <div>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          All Prompts
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all your saved AI prompts.
        </p>

      </div>


      {/* Sort */}
      <div className="mb-6 flex justify-end">

        <button
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3"
        >
          <SlidersHorizontal size={18} />
          Sort
        </button>

      </div>


      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter />
      </div>


      {/* Prompt Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filterPrompts.length > 0 ? (

          filterPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              id={prompt.id}
              title={prompt.title}
              description={prompt.description}
              category={prompt.category}
              favorite={prompt.favorite}
              pinned={prompt.pinned}
              date={prompt.date}
            />
          ))

        ) : (

          <p className="col-span-full text-center text-gray-500">
            No prompts found.
          </p>

        )}

      </div>

    </div>
  );
};


export default AllPrompts;