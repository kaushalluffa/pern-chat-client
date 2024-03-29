import App from "@/App";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";
import Auth from "../Auth/Auth";

const AllRoutes = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:chatId" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
