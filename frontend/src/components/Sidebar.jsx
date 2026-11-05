import {
  LayoutDashboard,
  Images,
  TrendingUp,
  Settings,
  BrainCircuit,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <BrainCircuit size={28} />
        <h2>Meme Factory</h2>
      </div>

      <p className="menu-label">WORKSPACE</p>

      <nav>
        <a className="nav-item active" href="#">
          <LayoutDashboard size={19} />
          Overview
        </a>

        <a className="nav-item" href="#trends">
          <Images size={19} />
          Trend Library
        </a>

        <a className="nav-item" href="#trends">
          <TrendingUp size={19} />
          Popularity
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a className="nav-item" href="#">
          <Settings size={19} />
          Settings
        </a>
      </div>
    </aside>
  );
}