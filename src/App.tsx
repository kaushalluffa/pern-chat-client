import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationSidebar } from "./components/navigation/navigation-sidebar";

function App() {
  return (
    <div className="bg-white dark:bg-[#313338]">
      <div className="h-full">
        <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
          <NavigationSidebar />
        </div>
        <main className="md:pl-[72px] h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
