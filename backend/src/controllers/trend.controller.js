import {
  collectMemeTrends,
  getMemeTrends,
} from "../services/trendCollector/imgflip.service.js";

export async function collectTrends(req, res) {
  try {
    const result = await collectMemeTrends();

    res.json({
      success: true,
      message: "Meme trends collected successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Trend collection error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to collect meme trends",
      error: error.message,
    });
  }
}

export function getTrends(req, res) {
  try {
    const trends = getMemeTrends();

    res.json({
      success: true,
      count: trends.length,
      data: trends,
    });
  } catch (error) {
    console.error("Get trends error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve meme trends",
    });
  }
}