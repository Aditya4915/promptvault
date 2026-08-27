import {
  LayoutDashboard,
  FileText,
  Star,
  Pin,
  Settings,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 h-[calc(100vh-4rem)] flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white">

      {/* Logo */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
            <span className="text-2xl">✦</span>
          </div>

          <div>
            <Link
              className="text-lg font-bold text-gray-900"
              to="/"
            >
              PromptVault
            </Link>

            <p className="text-xs text-gray-500">
              AI Prompt Library
            </p>
          </div>

        </div>
      </div>


      {/* Navigation */}
      <nav className="px-4">

        {/* Dashboard */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>


        {/* All Prompts */}
        <NavLink
          to="/prompts"
          className={({ isActive }) =>
            `mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <FileText size={20} />
          <span>All Prompts</span>
        </NavLink>


        {/* Favorites */}
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Star size={20} />
          <span>Favorites</span>
        </NavLink>


        {/* Pinned */}
        <NavLink
          to="/pinned"
          className={({ isActive }) =>
            `mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-purple-100 text-purple-700"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Pin size={20} />
          <span>Pinned</span>
        </NavLink>

      </nav>


      {/* Settings */}
      <div className="mt-auto border-t border-gray-200 p-4">

        <button
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;