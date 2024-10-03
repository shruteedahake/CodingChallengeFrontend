import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import React from "react";
import Signup from "./Components/Signup";
import BookManagement from "./Components/BookManagement";
import Home from "./Components/Home";

const SRoutes=()=>{
    return(<>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/books" element={<BookManagement />} />
        </Routes>
    </>)
}

export default SRoutes;