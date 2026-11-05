
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import Overview from "../pages/Overview";
import TrendLibrary from "../pages/TrendLibrary";
import FeaturePage from "../pages/FeaturePage";
import MemeStudio from "../pages/MemeStudio";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<Overview />} />
          <Route path="trends" element={<TrendLibrary />} />
          <Route path="studio" element={<MemeStudio />} />
            
          <Route
            path="queue"
            element={
              <FeaturePage
                title="Content Queue"
                description="Organize and schedule your upcoming content."
              />
            }
          />
          <Route
            path="analytics"
            element={
              <FeaturePage
                title="Analytics"
                description="Understand performance and discover what works."
              />
            }
          />
          <Route
            path="settings"
            element={
              <FeaturePage
                title="Settings"
                description="Manage your workspace and application preferences."
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
