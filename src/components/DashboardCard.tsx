import {
  FileText,
  Star,
  Folder,
  Clock,
} from "lucide-react";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const DashboardCard = () => {

  const prompts = useSelector(
    (state: RootState) => state.prompts.prompts
  );

  // Total prompts
  const totalPrompts = prompts.length;

  // Favorite prompts
  const favoritePrompts = prompts.filter(
    (prompt) => prompt.favorite
  ).length;

  // Unique categories
  const categories = new Set(
    prompts.map((prompt) => prompt.category)
  ).size;

  // Recently added
  const recentlyAdded = prompts.filter((prompt) => {
    const promptDate = new Date(prompt.date);
    const today = new Date();

    const difference =
      today.getTime() - promptDate.getTime();

    const days = difference / (1000 * 60 * 60 * 24);

    return days <= 7;
  }).length;


  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      {/* Total Prompts */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Total Prompts
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {totalPrompts}
            </h2>
          </div>

          <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
            <FileText size={24} />
          </div>

        </div>

        <p className="mt-4 text-sm text-green-600">
          All prompts
        </p>

      </div>


      {/* Favorite Prompts */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Favorite Prompts
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {favoritePrompts}
            </h2>
          </div>

          <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
            <Star size={24} />
          </div>

        </div>

        <p className="mt-4 text-sm text-gray-500">
          {favoritePrompts} marked as favorite
        </p>

      </div>


      {/* Categories */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Categories
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {categories}
            </h2>
          </div>

          <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
            <Folder size={24} />
          </div>

        </div>

        <p className="mt-4 text-sm text-gray-500">
          Unique categories
        </p>

      </div>


      {/* Recently Added */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Recently Added
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {recentlyAdded}
            </h2>
          </div>

          <div className="rounded-lg bg-green-100 p-3 text-green-600">
            <Clock size={24} />
          </div>

        </div>

        <p className="mt-4 text-sm text-gray-500">
          Added in the last 7 days
        </p>

      </div>

    </div>
  );
};

export default DashboardCard;