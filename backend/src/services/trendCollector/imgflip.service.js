import db from "../../database/db.js";

const IMGFLIP_API = "https://api.imgflip.com/get_memes";

export async function collectMemeTrends() {
  console.log("Starting meme trend collection...");

  const response = await fetch(IMGFLIP_API, {
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Imgflip HTTP error: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error_message || "Imgflip API failed");
  }

  const memes = result.data.memes;

  if (!Array.isArray(memes)) {
    throw new Error("Invalid meme data received");
  }

  const saveMeme = db.prepare(`
    INSERT INTO meme_templates (
      id,
      name,
      image_url,
      width,
      height,
      box_count,
      captions,
      popularity_score,
      source,
      first_seen,
      last_seen
    )
    VALUES (
      @id,
      @name,
      @image_url,
      @width,
      @height,
      @box_count,
      @captions,
      @popularity_score,
      'imgflip',
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      image_url = excluded.image_url,
      width = excluded.width,
      height = excluded.height,
      box_count = excluded.box_count,
      captions = excluded.captions,
      popularity_score = excluded.popularity_score,
      last_seen = CURRENT_TIMESTAMP
  `);

  const saveAll = db.transaction((templates) => {
    templates.forEach((meme, index) => {
      const popularityScore = Math.round(
        ((templates.length - index) / templates.length) * 100
      );

      saveMeme.run({
        id: String(meme.id),
        name: meme.name,
        image_url: meme.url,
        width: meme.width,
        height: meme.height,
        box_count: meme.box_count,
        captions: meme.captions || 0,
        popularity_score: popularityScore,
      });
    });
  });

  saveAll(memes);

  console.log(`Collected ${memes.length} meme templates!`);

  return {
    collected: memes.length,
    source: "Imgflip",
    templates: memes.length,
  };
}

export function getMemeTrends() {
  return db.prepare(`
    SELECT *
    FROM meme_templates
    ORDER BY popularity_score DESC, captions DESC
  `).all();
}