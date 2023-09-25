import AppRouter from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import ESPProvider from "./components/ESPProvider";
import "./language/i18n";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <ESPProvider />
      {/* @ts-ignore */}
      <Router>
        <AppRouter />
      </Router>
    </Suspense>
  );
}

export default App;
