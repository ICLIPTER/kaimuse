
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Images,
  Sparkles,
  CalendarDays,
  ChartLine,
  Settings,
  BrainCircuit,
} from "lucide-react";

const navigation = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Trend Library", path: "/trends", icon: Images },
  { label: "Meme Studio", path: "/studio", icon: Sparkles },
  { label: "Content Queue", path: "/queue", icon: CalendarDays },
  { label: "Analytics", path: "/analytics", icon: ChartLine },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <BrainCircuit size={23} />
        </div>
        <div className="brand-copy">
          <strong>Meme Factory</strong>
          <span>CREATOR WORKSPACE</span>
        </div>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            title={label}
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

        <div className="sidebar-version">
          <span className="version-dot" />
          <span>Development environment</span>
        </div>
      </div>
    </aside>
  );
}
