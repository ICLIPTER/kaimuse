
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Images,
  TrendingUp,
  Database,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { fetchTrends } from "../services/trendService";

export default function Overview() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrends()
      .then((result) => setTrends(result.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const topScore = trends.length
    ? Math.max(...trends.map((item) => item.popularity_score || 0))
    : 0;

  const stats = [
    {
      label: "Collected templates",
      value: loading ? "—" : trends.length,
      icon: Images,
      note: "Available in your library",
    },
    {
      label: "Top template score",
      value: loading ? "—" : topScore,
      icon: TrendingUp,
      note: "Based on source ranking",
    },
    {
      label: "Connected sources",
      value: "1",
      icon: Database,
      note: "Imgflip template catalogue",
    },
  ];

  return (
    <div className="page-stack">
      <section className="welcome-section">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            YOUR CREATOR COMMAND CENTER
          </div>
          <h1>Make something <span>memorable.</span></h1>
          <p>
            Discover meme formats, create original content, and build
            your publishing workflow.
          </p>
        </div>

        <Link to="/studio" className="primary-button">
          <Sparkles size={17} />
          Open Meme Studio
          <ArrowUpRight size={16} />
        </Link>
      </section>

      {error && <div className="error-message">{error}</div>}

      <section className="stats-grid">
        {stats.map(({ label, value, icon: Icon, note }) => (
          <article className="stat-card" key={label}>
            <div className="stat-top">
              <span>{label}</span>
              <div className="stat-icon"><Icon size={19} /></div>
            </div>
            <strong>{value}</strong>
            <p>{note}</p>
          </article>
        ))}
      </section>

      <section className="content-panel">
        <div className="panel-heading">
          <div>
            <h2>Recently collected formats</h2>
            <p>Your latest available meme templates.</p>
          </div>
          <Link to="/trends" className="text-link">
            View library <ArrowUpRight size={15} />
          </Link>
        </div>

        {loading ? (
          <p className="muted-message">Loading your templates...</p>
        ) : trends.length === 0 ? (
          <p className="muted-message">No templates collected yet.</p>
        ) : (
          <div className="recent-grid">
            {trends.slice(0, 4).map((meme) => (
              <article className="recent-card" key={meme.id}>
                <img src={meme.image_url} alt={meme.name} loading="lazy" />
                <div>
                  <strong>{meme.name}</strong>
                  <span>{meme.captions} captions</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="next-step-panel">
        <div className="next-step-icon"><Sparkles size={22} /></div>
        <div>
          <h2>The Meme Studio is next.</h2>
          <p>
            We're preparing the AI caption engine and creative tools.
            This module isn't active yet.
          </p>
        </div>
        <span className="planned-label">PLANNED</span>
      </section>
    </div>
  );
}
