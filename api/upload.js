const { verifyToken, githubApi } = require("./_utils");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { imageData, filename } = req.body || {};
  if (!imageData || !filename) return res.status(400).json({ error: "Missing imageData or filename" });

  // Strict allowlist: alphanumerics, hyphens, underscores + safe image extensions only
  if (!/^[A-Za-z0-9_-]+\.(jpg|jpeg|png|webp)$/.test(filename)) {
    return res.status(400).json({ error: "Invalid filename" });
  }

  const [owner, repo] = (process.env.GITHUB_REPO || "").split("/");
  const filePath = `/repos/${owner}/${repo}/contents/public/images/certs/${filename}`;

  let sha;
  try {
    const existing = await githubApi(filePath, "GET", null);
    if (existing.status === 200) sha = existing.body.sha;
  } catch {}

  const base64Content = imageData.replace(/^data:image\/\w+;base64,/, "");
  const body = { message: "chore: upload cert image via admin", content: base64Content };
  if (sha) body.sha = sha;

  try {
    const { status } = await githubApi(filePath, "PUT", body);
    if (status !== 200 && status !== 201) return res.status(500).json({ error: "Upload failed" });
    res.json({ path: `/images/certs/${filename}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};