import { useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

import PromptCard from "../components/PromptCard";
import CategoryFilter from "../components/CategoryFilter";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const AllPrompts = () => {
  // Sort state
  const [sortBy, setSortBy] = useState("newest");
  const [showSort, setShowSort] = useState(false);

  // Get prompts
  const prompts = useSelector(
    (state: RootState) => state.prompts.prompts
  );

  // Get global search text from Navbar
  const searchText = useSelector(
    (state: RootState) => state.prompts.searchText
  );

  // Get selected category
  const selectedCategory = useSelector(
    (state: RootState) => state.categories.selectedCategory
  );

  // Search filter
  const searchedPrompts = prompts.filter((prompt) => {
    const search = searchText.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      prompt.title.toLowerCase().includes(search) ||
      prompt.description.toLowerCase().includes(search) ||
      prompt.category.toLowerCase().includes(search)
    );
  });

  // Category filter
  const filterPrompts =
    selectedCategory === "All"
      ? searchedPrompts
      : searchedPrompts.filter(
          (prompt) => prompt.category === selectedCategory
        );

  // Sort prompts
  const sortedPrompts = [...filterPrompts].sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
      );
    }

    if (sortBy === "oldest") {
      return (
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
      );
    }

    if (sortBy === "az") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "za") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });

  return (
    <div>

      {/* Header */}
      <div className="mb-2">

        <h1 className="text-3xl font-bold text-gray-900">
          All Prompts
        </h1>

        <p className="mt-1 text-gray-500">
          Manage all your saved AI prompts.
        </p>

      </div>

      {/* Sort */}
      <div className="relative mb-4 flex justify-end">

        <button
          onClick={() => setShowSort(!showSort)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm hover:bg-gray-50"
        >
          <SlidersHorizontal size={16} />

          Sort

          <ChevronDown
            size={16}
            className={`transition-transform ${
              showSort ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Sort Dropdown */}
        {showSort && (
          <div className="absolute right-0 top-11 z-10 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">

            <button
              onClick={() => {
                setSortBy("newest");
                setShowSort(false);
              }}
              className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                sortBy === "newest"
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-700"
              }`}
            >
              Newest First
            </button>

            <button
              onClick={() => {
                setSortBy("oldest");
                setShowSort(false);
              }}
              className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                sortBy === "oldest"
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-700"
              }`}
            >
              Oldest First
            </button>

            <button
              onClick={() => {
                setSortBy("az");
                setShowSort(false);
              }}
              className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                sortBy === "az"
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-700"
              }`}
            >
              Title A → Z
            </button>

            <button
              onClick={() => {
                setSortBy("za");
                setShowSort(false);
              }}
              className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                sortBy === "za"
                  ? "bg-purple-50 text-purple-600"
                  : "text-gray-700"
              }`}
            >
              Title Z → A
            </button>

          </div>
        )}

      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter />
      </div>

      {/* Prompt Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {sortedPrompts.length > 0 ? (

          sortedPrompts.map((prompt) => (
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