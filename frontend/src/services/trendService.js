
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function fetchTrends() {
  const response = await fetch(`${API_URL}/trends`);

  if (!response.ok) {
    throw new Error("Failed to fetch meme trends");
  }

  return response.json();
}

export async function collectTrends() {
  const response = await fetch(`${API_URL}/trends/collect`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to collect meme trends");
  }

  return response.json();
}
