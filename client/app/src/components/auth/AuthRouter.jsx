import React from "react";
import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

function AuthRouter({ refreshAuth }) {
  //affichage
  return (
    <Routes>
      <Route index element={<Login refreshAuth={refreshAuth} />} />
      <Route path="/login" element={<Login refreshAuth={refreshAuth} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default AuthRouter;
