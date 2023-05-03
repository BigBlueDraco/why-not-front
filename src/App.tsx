import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Dashboard } from "./pages/Dashboard";
import { Onbording } from "./pages/Onbording";
import { Layout } from "./components/Layout/Layout";
import { Box } from "@mui/material";
import { useTheme } from "styled-components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="onbording" element={<Onbording />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
