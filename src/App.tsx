import AppRouter from "./router";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import history from "./history";
import ESPProvider from "./components/ESPProvider";
import { useEffect } from "react";
import "./language/i18n";
import { Suspense } from "react";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      {/* {history.location.pathname !== "/" && <ESPProvider />} */}
      <ESPProvider />

      <Router>
        <AppRouter />
      </Router>
    </Suspense>
  );
}

export default App;
