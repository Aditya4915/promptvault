import { Pin } from "lucide-react";

import PromptCard from "../components/PromptCard";
import CategoryFilter from "../components/CategoryFilter";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Pinned = () => {

  // Get all prompts
  const prompts = useSelector(
    (state: RootState) =>
      state.prompts.prompts
  );


  // Get global search text from Navbar
  const searchText = useSelector(
    (state: RootState) =>
      state.prompts.searchText
  );


  // Get selected category
  const selectedCategory = useSelector(
    (state: RootState) =>
      state.categories.selectedCategory
  );


  // Pinned + Search + Category filter
  const pinnedPrompts = prompts.filter(
    (prompt) => {

      // 1. Pinned filter
      if (!prompt.pinned) {
        return false;
      }


      // 2. Search filter
      const search =
        searchText.toLowerCase().trim();

      const matchesSearch =
        !search ||
        prompt.title
          .toLowerCase()
          .includes(search) ||
        prompt.description
          .toLowerCase()
          .includes(search) ||
        prompt.category
          .toLowerCase()
          .includes(search);


      // 3. Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        prompt.category === selectedCategory;


      return matchesSearch && matchesCategory;
    }
  );


  return (
    <div>

      {/* Header */}
      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
            <Pin size={22} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              Pinned
            </h1>

            <p className="mt-1 text-gray-500">
              Your important pinned prompts
            </p>

          </div>

        </div>

      </div>


      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter />
      </div>


      {/* Prompt Cards */}

      {pinnedPrompts.length > 0 ? (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {pinnedPrompts.map((prompt) => (

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

          ))}

        </div>

      ) : (

        <p className="text-center text-gray-500">
          No pinned prompts found.
        </p>

      )}

    </div>
  );
};

export default Pinned;