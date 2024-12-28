import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import CodeNow from "./components/CodeNow";
import History from "./components/History";
import NotFoundPage from "./components/404";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/codenow/:language/:uid?/:cid?" element={<CodeNow />} />
        <Route path="/history" element={<History />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
