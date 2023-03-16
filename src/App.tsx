import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Dashboard } from "./pages/Dashboard";
import { Onbording } from "./pages/Onbording";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "@mui/system";

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="onbording" element={<Onbording />} />
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
