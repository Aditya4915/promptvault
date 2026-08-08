import { Star } from "lucide-react";
import PromptCard from "../components/PromptCard";
import CategoryFilter from "../components/CategoryFilter";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";


const Favorites = () => {

  // Get all prompts
  const prompts = useSelector((state: RootState) =>state.prompts.prompts);


  // Get global search text
  const searchText = useSelector((state: RootState) =>state.prompts.searchText);


  // Get selected category
  const selectedCategory = useSelector((state: RootState) =>state.categories.selectedCategory);


  // Favorite + Search + Category filter
  const favoritePrompts = prompts.filter(
    (prompt) => {

      // 1. Favorite filter
      if (!prompt.favorite) {
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

          <div className="rounded-lg bg-yellow-100 p-2 text-yellow-600">
            <Star size={22} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-gray-900">
              Favorites
            </h1>

            <p className="mt-1 text-gray-500">
              Your favorite prompts
            </p>

          </div>

        </div>

      </div>


      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter />
      </div>


      {/* Prompt Cards */}

      {favoritePrompts.length > 0 ? (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {favoritePrompts.map((prompt) => (

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
          No favorite prompts found.
        </p>

      )}

    </div>
  );
};


export default Favorites;