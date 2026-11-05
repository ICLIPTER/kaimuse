
import { Sparkles } from "lucide-react";

export default function FeaturePage({ title, description }) {
  return (
    <section className="feature-placeholder">
      <div className="placeholder-icon"><Sparkles size={28} /></div>
      <span className="eyebrow">IN DEVELOPMENT</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <span className="planned-label">PLANNED MODULE</span>
    </section>
  );
}
