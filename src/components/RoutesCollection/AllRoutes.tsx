import App from "@/App";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Settings from "../Settings/Settings";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";

const AllRoutes = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:chatId" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
