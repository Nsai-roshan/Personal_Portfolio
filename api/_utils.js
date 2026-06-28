const crypto = require("crypto");
const https = require("https");

function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  const dotIdx = token.lastIndexOf(".");
  if (dotIdx === -1) return false;
  const payload = token.slice(0, dotIdx);
  const sig = token.slice(dotIdx + 1);
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) return false;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    if (!crypto.timingSafeEqual(a, b)) return false;
  } catch { return false; }
  try {
    const { expiry } = JSON.parse(Buffer.from(payload, "base64").toString());
    return Date.now() < expiry;
  } catch { return false; }
}

function githubApi(path, method, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: "api.github.com",
      path,
      method,
      headers: {
        ...(process.env.GITHUB_TOKEN ? { Authorization: "token " + process.env.GITHUB_TOKEN } : {}),
        "User-Agent": "portfolio-admin",
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
        ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let buf = "";
      res.on("data", (c) => (buf += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(buf || "{}") }); }
        catch { resolve({ status: res.statusCode, body: {} }); }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

module.exports = { verifyToken, githubApi };