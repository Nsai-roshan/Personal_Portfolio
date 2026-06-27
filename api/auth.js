const crypto = require("crypto");

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const { password } = req.body || {};
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) return res.status(500).json({ error: "Server misconfigured" });
  const expiry = Date.now() + 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ expiry })).toString("base64");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  res.json({ token: payload + "." + sig });
};