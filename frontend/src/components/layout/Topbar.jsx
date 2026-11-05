
import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const pageNames = {
  "/": "Overview",
  "/trends": "Trend Library",
  "/studio": "Meme Studio",
  "/queue": "Content Queue",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export default function Topbar() {
  const location = useLocation();
  const title = pageNames[location.pathname] || "Workspace";

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={15} />
        <strong>{title}</strong>
      </div>

      <div className="topbar-right">
        <span className="workspace-label">Personal workspace</span>
        <div className="avatar">MF</div>
      </div>
    </header>
  );
}
