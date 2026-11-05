
import { useEffect, useState } from "react";
import { RefreshCw, Search, Images } from "lucide-react";
import TrendCard from "../components/TrendCard";
import {
  fetchTrends,
  collectTrends,
} from "../services/trendService";

export default function TrendLibrary() {
  const [trends, setTrends] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function loadTrends() {
    const result = await fetchTrends();
    setTrends(result.data || []);
  }

  useEffect(() => {
    loadTrends()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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

  const filtered = trends.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <div className="eyebrow"><Images size={14} /> DISCOVERY</div>
          <h1>Trend Library</h1>
          <p>Explore the meme formats collected from Imgflip.</p>
        </div>

        <button
          className="primary-button"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw size={17} className={refreshing ? "spin" : ""} />
          {refreshing ? "Collecting..." : "Collect formats"}
        </button>
      </section>

      <div className="library-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search meme formats..."
          />
        </div>
        <span className="result-count">
          {filtered.length} templates
        </span>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p className="muted-message">Loading templates...</p>
      ) : filtered.length === 0 ? (
        <p className="muted-message">No matching templates found.</p>
      ) : (
        <div className="trend-grid">
          {filtered.map((meme) => (
            <TrendCard key={meme.id} meme={meme} />
          ))}
        </div>
      )}
    </div>
  );
}
