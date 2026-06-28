const { verifyToken, githubApi } = require("./_utils");

const getFilePath = () => {
  const [owner, repo] = (process.env.GITHUB_REPO || "").split("/");
  return { owner, repo, path: `/repos/${owner}/${repo}/contents/src/data/resume.json` };
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { path } = getFilePath();

  if (req.method === "GET") {
    try {
      const { status, body } = await githubApi(path, "GET", null);
      if (status !== 200) return res.status(500).json({ error: "Failed to fetch from GitHub" });
      const content = Buffer.from(body.content, "base64").toString("utf8").replace(/﻿/g, "");
      return res.json({ data: JSON.parse(content), sha: body.sha });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === "POST") {
    const { data, sha } = req.body || {};
    if (!data || !sha) return res.status(400).json({ error: "Missing data or sha" });
    try {
      const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
      const { status } = await githubApi(path, "PUT", {
        message: "chore: update portfolio via admin panel",
        content,
        sha,
      });
      if (status !== 200 && status !== 201) return res.status(500).json({ error: "GitHub commit failed" });
      // Fetch new sha after commit
      const refreshed = await githubApi(path, "GET", null);
      return res.json({ ok: true, sha: refreshed.body.sha });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  res.status(405).end();
};