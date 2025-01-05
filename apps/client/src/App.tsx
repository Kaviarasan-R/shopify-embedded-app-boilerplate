import { AppProvider as PolarisProvider } from "@shopify/polaris";
import { Navigate, Route, Routes } from "react-router-dom";

import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

import ExitFrame from "./Exitframe";
import Index from "./pages/Index";

function App() {
  return (
    <PolarisProvider i18n={translations}>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Index />} />
        <Route path="/exitframe" element={<ExitFrame />} />
      </Routes>
    </PolarisProvider>
  );
}

export default App;
