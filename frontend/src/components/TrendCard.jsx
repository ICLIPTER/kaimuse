export default function TrendCard({ meme }) {
  return (
    <article className="trend-card">
      <div className="trend-image">
        <img
          src={meme.image_url}
          alt={meme.name}
          loading="lazy"
        />

        <span className="score-badge">
          {meme.popularity_score} pts
        </span>
      </div>

      <div className="trend-info">
        <h3>{meme.name}</h3>

        <div className="trend-meta">
          <span>{meme.width} × {meme.height}</span>
          <span>{meme.box_count} text boxes</span>
        </div>

        <div className="trend-footer">
          <span>Imgflip</span>
          <span>{meme.captions} captions</span>
        </div>
      </div>
    </article>
  );
}