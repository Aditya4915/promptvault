import {
  LayoutDashboard,
  FileText,
  Star,
  Pin,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => 
  {
    const navigate=useNavigate();
  


  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-white">

      {/* Logo */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
            <span className="text-2xl">✦</span>
          </div>

          <div>
            <Link className="text-lg font-bold text-gray-900" to="/">
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
        <button className="flex w-full items-center gap-3 rounded-lg bg-purple-100 px-4 py-3 text-sm font-medium text-purple-700"
         onClick={()=>navigate("/")}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>

        {/* All Prompts */}
        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
          onClick={()=>navigate("/prompts")}>
          <FileText size={20} />
          <span>All Prompts</span>
        </button>

        {/* Favorites */}
        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
          onClick={()=>navigate("/favorites")}>
          <Star size={20} />
          <span>Favorites</span>
        </button>

        {/* Pinned */}
        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
          onClick={()=>navigate("/pinned")}>
          <Pin size={20} />
          <span>Pinned</span>
        </button>
      </nav>



      {/* Settings */}
      <div className="border-t border-gray-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;