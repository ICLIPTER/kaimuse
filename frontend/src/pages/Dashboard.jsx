import { useEffect, useState } from "react";
import { RefreshCw, Search, Images } from "lucide-react";

import Sidebar from "../components/Sidebar";
import TrendCard from "../components/TrendCard";

import {
  fetchTrends,
  collectTrends,
} from "../services/trendService";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [trends, setTrends] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function loadTrends() {
    try {
      setError("");
      const result = await fetchTrends();
      setTrends(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    try {
      setRefreshing(true);
      setError("");

      await collectTrends();
      await loadTrends();
    } catch (err) {
      setError(err.message);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadTrends();
  }, []);

  const filteredTrends = trends.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Your meme intelligence center.</p>
          </div>

          <button
            className="refresh-button"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              size={17}
              className={refreshing ? "spin" : ""}
            />
            {refreshing ? "Collecting..." : "Refresh trends"}
          </button>
        </header>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <section className="stats-grid">
          <div className="stat-card">
            <Images size={22} />
            <p>Total templates</p>
            <h2>{trends.length}</h2>
          </div>

          <div className="stat-card">
            <Images size={22} />
            <p>Top popularity score</p>
            <h2>
              {trends.length
                ? Math.max(...trends.map((m) => m.popularity_score))
                : 0}
            </h2>
          </div>

          <div className="stat-card">
            <Images size={22} />
            <p>Source</p>
            <h2>Imgflip</h2>
          </div>
        </section>

        <section className="library-section" id="trends">
          <div className="section-header">
            <div>
              <h2>Trend Library</h2>
              <p>Explore your collected meme formats.</p>
            </div>

            <div className="search-box">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <p className="empty-message">Loading templates...</p>
          ) : filteredTrends.length === 0 ? (
            <p className="empty-message">No templates found.</p>
          ) : (
            <div className="trend-grid">
              {filteredTrends.map((meme) => (
                <TrendCard key={meme.id} meme={meme} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}