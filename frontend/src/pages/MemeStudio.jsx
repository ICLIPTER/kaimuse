
import { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  Search,
  Images,
  Download,
  Sparkles,
  Type,
  X,
  Loader2,
  Check,
} from "lucide-react";

import { fetchTrends } from "../services/trendService";
import "../styles/MemeStudio.css";

export default function MemeStudio() {
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const [fontSize, setFontSize] = useState(30);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#000000");

  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");
  const [exportSuccess, setExportSuccess] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    async function loadTemplates() {
      try {
        setLoading(true);
        setError("");

        const result = await fetchTrends();
        const data = result.data || [];

        setTemplates(data);

        if (data.length > 0) {
          setSelected(data[0]);
        }
      } catch (err) {
        setError(err.message || "Unable to load templates.");
      } finally {
        setLoading(false);
      }
    }

    loadTemplates();
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) =>
      template.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [templates, search]);

  async function handleExport() {
    if (!canvasRef.current || !selected) return;

    try {
      setExporting(true);
      setError("");
      setExportSuccess(false);

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#000000",
      });

      const link = document.createElement("a");
      link.download = `${selected.name.replace(/[^a-z0-9]/gi, "-")}-meme.png`;
      link.href = dataUrl;
      link.click();

      setExportSuccess(true);
    } catch (err) {
      console.error("Meme export failed:", err);
      setError(
        "Export failed. The selected image may block cross-origin export."
      );
    } finally {
      setExporting(false);
    }
  }

  function selectTemplate(template) {
    setSelected(template);
    setExportSuccess(false);
  }

  return (
    <div className="studio-page">
      <section className="studio-heading">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            CREATIVE WORKSPACE
          </div>

          <h1>Meme Studio</h1>
          <p>Turn trending formats into original memes.</p>
        </div>

        <button
          className="studio-export-button"
          onClick={handleExport}
          disabled={!selected || exporting}
        >
          {exporting ? (
            <Loader2 size={17} className="spin" />
          ) : (
            <Download size={17} />
          )}
          {exporting ? "Exporting..." : "Export PNG"}
        </button>
      </section>

      {error && <div className="studio-error">{error}</div>}

      <div className="studio-workspace">
        {/* TEMPLATE LIBRARY */}

        <aside className="studio-library">
          <div className="studio-panel-heading">
            <div>
              <h2>Templates</h2>
              <span>{templates.length} available</span>
            </div>

            <Images size={19} />
          </div>

          <div className="studio-search">
            <Search size={16} />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a template..."
            />

            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="studio-template-list">
            {loading ? (
              <div className="studio-empty">
                <Loader2 size={22} className="spin" />
                <span>Loading templates...</span>
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="studio-empty">
                No templates found.
              </div>
            ) : (
              filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  className={`studio-template ${
                    selected?.id === template.id ? "active" : ""
                  }`}
                  onClick={() => selectTemplate(template)}
                >
                  <img
                    src={template.image_url}
                    alt={template.name}
                    loading="lazy"
                  />

                  <span>{template.name}</span>

                  {selected?.id === template.id && (
                    <Check size={16} className="template-check" />
                  )}
                </button>
              ))
            )}
          </div>
        </aside>

        {/* MEME CANVAS */}

        <main className="studio-canvas-panel">
          <div className="studio-panel-heading">
            <div>
              <h2>Canvas</h2>
              <span>
                {selected ? selected.name : "Select a template"}
              </span>
            </div>

            <span className="canvas-status">
              <span />
              LIVE PREVIEW
            </span>
          </div>

          <div className="studio-canvas-area">
            {selected ? (
              <div
                className="meme-canvas"
                ref={canvasRef}
                style={{
                  aspectRatio: `${selected.width} / ${selected.height}`,
                }}
              >
                <img
                  src={selected.image_url}
                  alt={selected.name}
                  crossOrigin="anonymous"
                  className="meme-background"
                />

                <div
                  className="meme-caption meme-caption-top"
                  style={{
                    fontSize: `${fontSize}px`,
                    color: fontColor,
                    WebkitTextStroke: `1.5px ${strokeColor}`,
                  }}
                >
                  {topText}
                </div>

                <div
                  className="meme-caption meme-caption-bottom"
                  style={{
                    fontSize: `${fontSize}px`,
                    color: fontColor,
                    WebkitTextStroke: `1.5px ${strokeColor}`,
                  }}
                >
                  {bottomText}
                </div>
              </div>
            ) : (
              <div className="studio-empty">
                {loading ? "Preparing your workspace..." : "Select a template to get started."}
              </div>
            )}
          </div>

          {selected && (
            <div className="canvas-footer">
              <span>{selected.width} × {selected.height}</span>
              <span>{selected.box_count} original text boxes</span>
            </div>
          )}
        </main>

        {/* EDITOR CONTROLS */}

        <aside className="studio-editor">
          <div className="studio-panel-heading">
            <div>
              <h2>Customize</h2>
              <span>Edit your meme</span>
            </div>

            <Type size={19} />
          </div>

          <div className="studio-editor-content">
            <section className="editor-section">
              <label>TOP CAPTION</label>

              <textarea
                value={topText}
                onChange={(event) => setTopText(event.target.value)}
                placeholder="Enter your top caption..."
                rows={3}
              />
            </section>

            <section className="editor-section">
              <label>BOTTOM CAPTION</label>

              <textarea
                value={bottomText}
                onChange={(event) => setBottomText(event.target.value)}
                placeholder="Enter your bottom caption..."
                rows={3}
              />
            </section>

            <div className="editor-divider" />

            <section className="editor-section">
              <div className="editor-label-row">
                <label>FONT SIZE</label>
                <span>{fontSize}px</span>
              </div>

              <input
                type="range"
                min="12"
                max="64"
                value={fontSize}
                onChange={(event) =>
                  setFontSize(Number(event.target.value))
                }
              />
            </section>

            <section className="editor-section">
              <label>TEXT COLOR</label>

              <div className="color-control">
                <input
                  type="color"
                  value={fontColor}
                  onChange={(event) => setFontColor(event.target.value)}
                />
                <span>{fontColor.toUpperCase()}</span>
              </div>
            </section>

            <section className="editor-section">
              <label>OUTLINE COLOR</label>

              <div className="color-control">
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(event) => setStrokeColor(event.target.value)}
                />
                <span>{strokeColor.toUpperCase()}</span>
              </div>
            </section>

            <button
              className="studio-reset-button"
              onClick={() => {
                setTopText("");
                setBottomText("");
                setFontSize(30);
                setFontColor("#ffffff");
                setStrokeColor("#000000");
                setExportSuccess(false);
              }}
            >
              Reset editor
            </button>

            {exportSuccess && (
              <div className="studio-success">
                <Check size={16} />
                Meme exported successfully!
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
