import App from "@/App";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Settings from "../Settings/Settings";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import Auth from "../Auth/Auth";

const AllRoutes = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:chatId" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
