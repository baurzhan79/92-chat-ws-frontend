import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./containers/User/Register";
import Login from "./containers/User/Login";

const AllRoutes = ({ user }) => {
    return (
        <Routes>
            <Route path="/" element={<h3 style={{ textAlign: "center" }}>Main page</h3>} />
            <Route path="/register" element={<Register isAllowed={!user} />} />
            <Route path="/login" element={<Login isAllowed={!user} />} />
            <Route path="*" element={<h3 style={{ textAlign: "center" }}>Page not found</h3>} />
        </Routes>
    )
}

export default AllRoutes