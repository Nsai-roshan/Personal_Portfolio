import { useState, useEffect, useRef, useCallback } from "react";
import { PortfolioDataContext } from "../contexts/PortfolioDataContext";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Certifications from "../components/Certifications";
import ProfileTab from "./tabs/ProfileTab";
import ProjectsTab from "./tabs/ProjectsTab";
import ExperienceTab from "./tabs/ExperienceTab";
import EducationTab from "./tabs/EducationTab";
import CertificationsTab from "./tabs/CertificationsTab";
import SkillsTab from "./tabs/SkillsTab";

// ── Token helpers ──────────────────────────────────────────────────────────
const TOKEN_KEY = "admin_token";
const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

function authHeader() {
  return { Authorization: "Bearer " + getToken(), "Content-Type": "application/json" };
}

// ── Login screen ───────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        const { token } = await res.json();
        onLogin(token);
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Could not reach server");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#000" }}>
      <div className="w-full max-w-sm p-8 rounded-2xl" style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#6366f1" }}>Portfolio</p>
        <h1 className="text-xl font-black text-white mb-6">Admin Sign In</h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#52525b" }}>Password</label>
            <input
              type="password" value={pw} onChange={(e) => { setPw(e.target.value); setError(""); }}
              placeholder="Enter admin password" autoFocus
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: "0.9rem", background: "#111", border: "1px solid #222", color: "#fff", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          {error && <p className="text-xs mb-3" style={{ color: "#ef4444" }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "10px", borderRadius: 10, background: "#6366f1", color: "#fff", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Publish button states ─────────────────────────────────────────────────
function PublishBtn({ status, onClick, hasChanges }) {
  const labels = { idle: "Publish", publishing: "Publishing…", success: "✓ Published", error: "✗ Failed — Retry" };
  const colors = { idle: "#6366f1", publishing: "#52525b", success: "#16a34a", error: "#dc2626" };
  return (
    <div className="flex items-center gap-3">
      {hasChanges && status === "idle" && (
        <span className="text-xs" style={{ color: "#f59e0b" }}>● Unsaved changes</span>
      )}
      {status === "success" && (
        <span className="text-xs" style={{ color: "#4ade80" }}>Live in ~60s</span>
      )}
      <button
        onClick={onClick}
        disabled={status === "publishing"}
        style={{ padding: "7px 20px", borderRadius: 8, background: colors[status], color: "#fff", fontWeight: 700, fontSize: "0.8rem", border: "none", cursor: status === "publishing" ? "not-allowed" : "pointer" }}>
        {labels[status]}
      </button>
    </div>
  );
}

// ── Preview pane ──────────────────────────────────────────────────────────
const TAB_TO_ID = { Profile: "hero", Projects: "projects", Experience: "experience", Education: "education", Certifications: "certifications", Skills: "skills" };

function PreviewPane({ data, activeTab }) {
  const paneRef = useRef(null);

  useEffect(() => {
    const id = TAB_TO_ID[activeTab];
    if (!id || !paneRef.current) return;
    const el = paneRef.current.querySelector(`[data-preview-section="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeTab]);

  return (
    <div ref={paneRef} style={{ overflowY: "auto", height: "100%", background: "#000" }}>
      <PortfolioDataContext.Provider value={data}>
        <div data-preview-section="hero"><Hero /></div>
        <div data-preview-section="skills"><Skills /></div>
        <div data-preview-section="projects"><Projects /></div>
        <div data-preview-section="experience"><Experience /></div>
        <div data-preview-section="education"><Education /></div>
        <div data-preview-section="certifications"><Certifications /></div>
      </PortfolioDataContext.Provider>
    </div>
  );
}

// ── Main admin panel ──────────────────────────────────────────────────────
const TABS = ["Profile", "Projects", "Experience", "Education", "Certifications", "Skills"];

export default function AdminPanel() {
  const [token, setTokenState] = useState(getToken);
  const [editData, setEditData] = useState(null);
  const [fileSha, setFileSha] = useState(null);
  const [activeTab, setActiveTab] = useState("Projects");
  const [publishStatus, setPublishStatus] = useState("idle");
  const [loadError, setLoadError] = useState("");
  const originalData = useRef(null);

  const login = useCallback((t) => {
    setToken(t);
    setTokenState(t);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setEditData(null);
  }, []);

  // Load data from GitHub on auth
  useEffect(() => {
    if (!token) return;
    fetch("/api/data", { headers: authHeader() })
      .then((r) => {
        if (r.status === 401) { logout(); return null; }
        return r.json();
      })
      .then((json) => {
        if (!json) return;
        setEditData(json.data);
        setFileSha(json.sha);
        originalData.current = JSON.stringify(json.data);
      })
      .catch(() => setLoadError("Failed to load data. Check your env vars and GitHub token."));
  }, [token, logout]);

  const updateSection = useCallback((section, value) => {
    setEditData((prev) => ({ ...prev, [section]: value }));
    setPublishStatus("idle");
  }, []);

  const publish = useCallback(async () => {
    setPublishStatus("publishing");
    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ data: editData, sha: fileSha }),
      });
      if (!res.ok) throw new Error();
      const { sha } = await res.json();
      setFileSha(sha);
      originalData.current = JSON.stringify(editData);
      setPublishStatus("success");
      setTimeout(() => setPublishStatus("idle"), 6000);
    } catch {
      setPublishStatus("error");
    }
  }, [editData, fileSha]);

  const hasChanges = editData && originalData.current && JSON.stringify(editData) !== originalData.current;

  if (!token) return <LoginScreen onLogin={login} />;

  if (!editData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#000" }}>
        {loadError
          ? <div className="text-center"><p className="text-sm mb-3" style={{ color: "#ef4444" }}>{loadError}</p><button onClick={logout} style={{ color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontSize: "0.82rem" }}>← Back to login</button></div>
          : <p className="text-sm" style={{ color: "#52525b" }}>Loading portfolio data…</p>
        }
      </div>
    );
  }

  const tabProps = { data: editData, updateSection, token };

  return (
    <div className="flex flex-col" style={{ height: "100vh", background: "#000", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", flexShrink: 0 }}>
        <div className="flex items-center justify-between px-5 h-12">
          <div className="flex items-center gap-3">
            <a href="/" style={{ fontSize: "0.75rem", color: "#52525b", textDecoration: "none" }}>&#8592; Portfolio</a>
            <span style={{ color: "#1a1a1a" }}>|</span>
            <span className="text-sm font-bold text-white">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <PublishBtn status={publishStatus} onClick={publish} hasChanges={hasChanges} />
            <button onClick={logout} style={{ background: "none", border: "1px solid #222", borderRadius: 8, color: "#52525b", cursor: "pointer", fontSize: "0.75rem", padding: "5px 12px" }}>Logout</button>
          </div>
        </div>
      </div>

      {/* Split pane */}
      <div className="flex" style={{ flex: 1, overflow: "hidden" }}>
        {/* Editor pane */}
        <div style={{ width: "44%", minWidth: 360, borderRight: "1px solid #1a1a1a", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Tab bar */}
          <div className="flex gap-0.5 px-3 py-2" style={{ borderBottom: "1px solid #1a1a1a", flexShrink: 0, overflowX: "auto" }}>
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap"
                style={activeTab === tab ? { background: "#6366f1", color: "#fff" } : { background: "transparent", color: "#52525b" }}>
                {tab}
              </button>
            ))}
          </div>
          {/* Tab content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px" }}>
            {activeTab === "Profile"        && <ProfileTab        {...tabProps} />}
            {activeTab === "Projects"       && <ProjectsTab       {...tabProps} />}
            {activeTab === "Experience"     && <ExperienceTab     {...tabProps} />}
            {activeTab === "Education"      && <EducationTab      {...tabProps} />}
            {activeTab === "Certifications" && <CertificationsTab {...tabProps} />}
            {activeTab === "Skills"         && <SkillsTab         {...tabProps} />}
          </div>
        </div>

        {/* Preview pane */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 8, left: 12, zIndex: 10, background: "rgba(0,0,0,0.7)", borderRadius: 6, padding: "3px 10px", fontSize: "0.68rem", color: "#52525b", border: "1px solid #1a1a1a" }}>
            LIVE PREVIEW
          </div>
          <PreviewPane data={editData} activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}