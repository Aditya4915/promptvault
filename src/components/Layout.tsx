import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div className="flex min-w-0 flex-1 flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-1 overflow-auto p-8">
            <Outlet />
            </main>
        </div>
    </div>
  );
};

export default Layout;