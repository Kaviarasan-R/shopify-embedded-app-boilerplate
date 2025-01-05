import { AppProvider as PolarisProvider } from "@shopify/polaris";
import { Route, Routes } from "react-router-dom";

import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";

import ExitIframe from "./ExitIframe";
import NotFound from "./NotFound";

import Index from "./pages/Index";

export default function App() {
  return (
    <PolarisProvider i18n={translations}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/exitiframe" element={<ExitIframe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PolarisProvider>
  );
}
