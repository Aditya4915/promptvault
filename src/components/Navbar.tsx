import {Bell,Moon,Plus,Search,} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector,} from "react-redux";
import type { AppDispatch,RootState,} from "../redux/store";
import {handleSearchText,} from "../features/promptSlice";


const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Get search text from Redux
  const searchText = useSelector((state: RootState) =>state.prompts.searchText);

  return (
    <header className="fixed left-64 right-0 px-6 gap-6 h-16 border-b border-gray-200  flex justify-between items-center bg-white">

      {/* Search */}
      <div className="relative w-[405px]">

        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={searchText}
          onChange={(e) =>
            dispatch(
              handleSearchText(e.target.value)
            )
          }
          placeholder="Search prompts by title or content..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-12 text-sm text-gray-700 outline-none placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
        />

        {/* Keyboard Shortcut */}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-500">
          /
        </span>

      </div>


      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Dark Mode */}
        <button
          className="text-gray-700 transition hover:text-purple-600"
          title="Toggle dark mode"
        >
          <Moon size={22} />
        </button>


        {/* Notification */}
        <button
          className="text-gray-700 transition hover:text-purple-600"
          title="Notifications"
        >
          <Bell size={22} />
        </button>


        {/* New Prompt */}
        <button
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700"
          onClick={() => navigate("/add-prompt")}
        >
          <Plus size={19} />
          <span>New Prompt</span>
        </button>

      </div>

    </header>
  );
};


export default Navbar;