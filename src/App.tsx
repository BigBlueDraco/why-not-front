import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Dashboard } from "./pages/Dashboard";
import { Onbording } from "./pages/Onbording";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "@mui/system";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="onbording" element={<Onbording />} />
        </Route>

        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
