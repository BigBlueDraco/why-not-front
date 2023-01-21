import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Onbording } from "./pages/Onbording";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dshboard" element={<Dashboard />} />
        <Route path="onbording" element={<Onbording />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
