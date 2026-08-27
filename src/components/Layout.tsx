import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { fetchPrompts } from "../features/promptSlice";

const Layout = () => 
{

    const dispatch=useDispatch<AppDispatch>()

    useEffect(()=>
    {
      dispatch(fetchPrompts())
    },[dispatch])

  return (
    <div className=" flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div className="flex min-w-0 flex-1 flex-col ml-64">
           
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-1 overflow-auto p-8 mt-12">
            <Outlet />
            </main>

        </div>
    </div>
  );
};

export default Layout;