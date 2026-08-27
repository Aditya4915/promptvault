
import { useSelector } from "react-redux";
import type { RootState} from "../redux/store";

import DashboardCard from "../components/DashboardCard";
import PromptCard from "../components/PromptCard";


const Dashboards = () => {



  // Get prompts
  const prompts = useSelector(
    (state: RootState) =>
      state.prompts.prompts
  );


  // Get search text from Redux
  const searchText = useSelector(
    (state: RootState) =>
      state.prompts.searchText
  );


  // Loading and error
  const { loading, error } = useSelector(
    (state: RootState) =>
      state.prompts
  );



  // Search prompts
  const searchedPrompts = prompts.filter(
    (prompt) => {

      const search =
        searchText.toLowerCase().trim();

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


  // Get latest 9 prompts
  const recentPrompts = [...searchedPrompts]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 9);


  if (loading) {
    return (
      <div className="p-6">
        Loading prompts...
      </div>
    );
  }


  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }


  return (
    <div>

      {/* Header */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className=" text-gray-500">
          Welcome back! Here's what's happening
          with your prompts.
        </p>

      </div>


      {/* Dashboard Cards */}
      <DashboardCard />


      {/* Recently Added */}
      <div className="mt-8">

        <h1 className="mb-4 text-xl font-semibold">
          {searchText
            ? `Search results for "${searchText}"`
            : "Recently added"}
        </h1>


        {recentPrompts.length === 0 ? (

          <p className="text-gray-500">
            No prompts found.
          </p>

        ) : (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {recentPrompts.map((prompt) => (

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

        )}

      </div>

    </div>
  );
};

export default Dashboards;