import { useState } from "react";
import usePortfolioData from "../hooks/usePortfolioData";
import { moveItem } from "./experienceOrder";

const PASSWORD = "portfolio2025";

function useAdminAuth() {
  const [authed, setAuthed] = useState(() => localStorage.getItem("admin_auth") === "true");
  const login = (pw) => {
    if (pw === PASSWORD) { localStorage.setItem("admin_auth", "true"); setAuthed(true); return true; }
    return false;
  };
  const logout = () => { localStorage.removeItem("admin_auth"); setAuthed(false); };
  return { authed, login, logout };
}

// ── Generic modal ──────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
      <div className="w-full max-w-xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto" style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Field components ───────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: "#52525b" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "8px 12px", borderRadius: 8, fontSize: "0.82rem",
  background: "#111", border: "1px solid #1a1a1a", color: "#fff", outline: "none",
};

function Input({ ...props }) {
  return <input style={inputStyle} {...props} />;
}
function Textarea({ ...props }) {
  return <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 80 }} {...props} />;
}

// ── Btn ────────────────────────────────────────────────────────────────────
function Btn({ children, onClick, variant = "primary", small, type = "button" }) {
  const base = { borderRadius: 8, fontWeight: 600, cursor: "pointer", border: "none", fontSize: small ? "0.72rem" : "0.82rem", padding: small ? "4px 12px" : "8px 18px" };
  const variants = {
    primary:   { background: "#6366f1", color: "#fff" },
    ghost:     { background: "transparent", color: "#a1a1aa", border: "1px solid #1a1a1a" },
    danger:    { background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" },
    success:   { background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" },
  };
  return <button type={type} style={{ ...base, ...variants[variant] }} onClick={onClick}>{children}</button>;
}

// ── Login screen ───────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!onLogin(pw)) setError(true);
  };
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#000" }}>
      <div className="w-full max-w-sm p-8 rounded-2xl" style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#6366f1" }}>Portfolio Admin</p>
        <h1 className="text-xl font-black text-white mb-6">Sign In</h1>
        <form onSubmit={submit}>
          <Field label="Password">
            <Input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }} placeholder="Enter password" autoFocus />
          </Field>
          {error && <p className="text-xs mb-3" style={{ color: "#ef4444" }}>Incorrect password</p>}
          <Btn type="submit" onClick={submit}>Enter</Btn>
        </form>
      </div>
    </div>
  );
}

// ── Projects Tab ───────────────────────────────────────────────────────────
function ProjectsTab({ data, updateSection }) {
  const [editing, setEditing] = useState(null); // null | project object | "new"
  const projects = data.projects || [];

  const save = (proj) => {
    if (proj.id) {
      updateSection("projects", projects.map(p => p.id === proj.id ? proj : p));
    } else {
      updateSection("projects", [...projects, { ...proj, id: `P${Date.now()}` }]);
    }
    setEditing(null);
  };
  const remove = (id) => updateSection("projects", projects.filter(p => p.id !== id));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Projects ({projects.length})</p>
        <Btn onClick={() => setEditing({})}>+ Add Project</Btn>
      </div>
      <div className="space-y-2">
        {projects.map(p => (
          <div key={p.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
            <div>
              <p className="text-sm font-medium text-white">{p.title}</p>
              <p className="text-xs mt-0.5" style={{ color: "#52525b" }}>{p.tech_stack?.slice(0,3).join(", ")}</p>
            </div>
            <div className="flex gap-2">
              <Btn small variant="ghost" onClick={() => setEditing(p)}>Edit</Btn>
              <Btn small variant="danger" onClick={() => remove(p.id)}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
      {editing !== null && (
        <ProjectForm initial={editing} onSave={save} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

function ProjectForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    title: "", description: "", url: "", start_date: "", end_date: "",
    ...initial,
    tech_stack: Array.isArray(initial.tech_stack) ? initial.tech_stack.join(", ") : (initial.tech_stack || ""),
    outcomes: Array.isArray(initial.outcomes) ? initial.outcomes.join("\n") : (initial.outcomes || ""),
  }));
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const submit = () => onSave({
    ...form,
    tech_stack: form.tech_stack.split(",").map(s => s.trim()).filter(Boolean),
    outcomes: form.outcomes.split("\n").map(s => s.trim()).filter(Boolean),
  });
  return (
    <Modal title={form.id ? "Edit Project" : "Add Project"} onClose={onClose}>
      <Field label="Title"><Input value={form.title} onChange={f("title")} placeholder="Project name" /></Field>
      <Field label="Description"><Textarea value={form.description} onChange={f("description")} placeholder="Brief description" /></Field>
      <Field label="GitHub URL"><Input value={form.url} onChange={f("url")} placeholder="https://github.com/..." /></Field>
      <Field label="Tech Stack (comma-separated)"><Input value={form.tech_stack} onChange={f("tech_stack")} placeholder="Go, React, PostgreSQL" /></Field>
      <Field label="Start Date"><Input value={form.start_date} onChange={f("start_date")} placeholder="2025-01" /></Field>
      <Field label="End Date (blank = In Progress)"><Input value={form.end_date} onChange={f("end_date")} placeholder="2025-06" /></Field>
      <Field label="Outcomes (one per line)"><Textarea value={form.outcomes} onChange={f("outcomes")} placeholder="What did you build/achieve?" style={{ minHeight: 100 }} /></Field>
      <div className="flex gap-3 mt-6"><Btn onClick={submit}>Save</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

// ── Experience Tab ─────────────────────────────────────────────────────────
function ExperienceTab({ data, updateSection }) {
  const [editing, setEditing] = useState(null);
  const exps = data.experiences || [];
  const save = (exp) => {
    if (exp.id && exps.find(e => e.id === exp.id)) {
      updateSection("experiences", exps.map(e => e.id === exp.id ? exp : e));
    } else {
      updateSection("experiences", [...exps, { ...exp, id: `exp_${Date.now()}` }]);
    }
    setEditing(null);
  };
  const remove = (id) => updateSection("experiences", exps.filter(e => e.id !== id));
  const move = (index, direction) => updateSection("experiences", moveItem(exps, index, direction));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Experience ({exps.length})</p>
        <Btn onClick={() => setEditing({})}>+ Add</Btn>
      </div>
      <div className="space-y-2">
        {exps.map((e, i) => (
          <div key={e.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
            {/* Up/down controls */}
            <div className="flex flex-col gap-0.5 mr-3 shrink-0">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                title="Move up"
                style={{
                  background: "transparent", border: "none", cursor: i === 0 ? "default" : "pointer",
                  color: i === 0 ? "#2a2a2a" : "#52525b", lineHeight: 1, padding: "2px 4px", fontSize: "0.7rem",
                }}
              >▲</button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === exps.length - 1}
                title="Move down"
                style={{
                  background: "transparent", border: "none", cursor: i === exps.length - 1 ? "default" : "pointer",
                  color: i === exps.length - 1 ? "#2a2a2a" : "#52525b", lineHeight: 1, padding: "2px 4px", fontSize: "0.7rem",
                }}
              >▼</button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{e.job_title}</p>
              <p className="text-xs mt-0.5" style={{ color: "#52525b" }}>{e.company} · {e.start_date}{e.end_date ? ` - ${e.end_date}` : " - Present"}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Btn small variant="ghost" onClick={() => setEditing(e)}>Edit</Btn>
              <Btn small variant="danger" onClick={() => remove(e.id)}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
      {editing !== null && <ExpForm initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </div>
  );
}

function ExpForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    job_title: "", company: "", start_date: "", end_date: "", is_current: false,
    ...initial,
    bullets: Array.isArray(initial.bullets) ? initial.bullets.join("\n") : (initial.bullets || ""),
    skills_used: Array.isArray(initial.skills_used) ? initial.skills_used.join(", ") : (initial.skills_used || ""),
  }));
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const submit = () => onSave({
    ...form,
    bullets: form.bullets.split("\n").map(s => s.trim()).filter(Boolean),
    skills_used: form.skills_used.split(",").map(s => s.trim()).filter(Boolean),
    is_current: form.is_current === true || form.is_current === "true",
  });
  return (
    <Modal title={form.id ? "Edit Experience" : "Add Experience"} onClose={onClose}>
      <Field label="Job Title"><Input value={form.job_title} onChange={f("job_title")} /></Field>
      <Field label="Company"><Input value={form.company} onChange={f("company")} /></Field>
      <Field label="Start Date"><Input value={form.start_date} onChange={f("start_date")} placeholder="2024-01" /></Field>
      <Field label="End Date"><Input value={form.end_date} onChange={f("end_date")} placeholder="2024-12 (blank if current)" /></Field>
      <Field label="Bullets (one per line)"><Textarea value={form.bullets} onChange={f("bullets")} /></Field>
      <Field label="Skills Used (comma-separated)"><Input value={form.skills_used} onChange={f("skills_used")} /></Field>
      <div className="flex gap-3 mt-6"><Btn onClick={submit}>Save</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

// ── Education Tab ──────────────────────────────────────────────────────────
function EducationTab({ data, updateSection }) {
  const [editing, setEditing] = useState(null);
  const edu = data.education || [];
  const save = (e) => {
    if (e.id && edu.find(x => x.id === e.id)) {
      updateSection("education", edu.map(x => x.id === e.id ? e : x));
    } else {
      updateSection("education", [...edu, { ...e, id: `edu_${Date.now()}` }]);
    }
    setEditing(null);
  };
  const remove = (id) => updateSection("education", edu.filter(e => e.id !== id));
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Education ({edu.length})</p>
        <Btn onClick={() => setEditing({})}>+ Add</Btn>
      </div>
      <div className="space-y-2">
        {edu.map(e => (
          <div key={e.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
            <div>
              <p className="text-sm font-medium text-white">{e.degree}</p>
              <p className="text-xs mt-0.5" style={{ color: "#52525b" }}>{e.institution} · {e.gpa}</p>
            </div>
            <div className="flex gap-2">
              <Btn small variant="ghost" onClick={() => setEditing(e)}>Edit</Btn>
              <Btn small variant="danger" onClick={() => remove(e.id)}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
      {editing !== null && <EduForm initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </div>
  );
}

function EduForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    degree: "", institution: "", gpa: "", start_date: "", end_date: "",
    ...initial,
    coursework: Array.isArray(initial.coursework) ? initial.coursework.join(", ") : (initial.coursework || ""),
  }));
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const submit = () => onSave({
    ...form,
    coursework: form.coursework.split(",").map(s => s.trim()).filter(Boolean),
  });
  return (
    <Modal title="Education" onClose={onClose}>
      <Field label="Degree"><Input value={form.degree} onChange={f("degree")} placeholder="Bachelor of Science in Computer Science" /></Field>
      <Field label="Institution"><Input value={form.institution} onChange={f("institution")} /></Field>
      <Field label="GPA"><Input value={form.gpa} onChange={f("gpa")} placeholder="3.71 / 4.0" /></Field>
      <Field label="Start Date"><Input value={form.start_date} onChange={f("start_date")} placeholder="2021-08" /></Field>
      <Field label="End Date"><Input value={form.end_date} onChange={f("end_date")} placeholder="2024-12" /></Field>
      <Field label="Coursework (comma-separated)"><Textarea value={form.coursework} onChange={f("coursework")} /></Field>
      <div className="flex gap-3 mt-6"><Btn onClick={submit}>Save</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

// ── Certifications Tab ─────────────────────────────────────────────────────
function CertificationsTab({ data, updateSection }) {
  const [editing, setEditing] = useState(null);
  const certs = data.certifications || [];
  const save = (c) => {
    if (c.id && certs.find(x => x.id === c.id)) {
      updateSection("certifications", certs.map(x => x.id === c.id ? c : x));
    } else {
      updateSection("certifications", [...certs, { ...c, id: `cert_${Date.now()}` }]);
    }
    setEditing(null);
  };
  const remove = (id) => updateSection("certifications", certs.filter(c => c.id !== id));
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Certifications ({certs.length})</p>
        <Btn onClick={() => setEditing({})}>+ Add</Btn>
      </div>
      {certs.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: "#52525b" }}>No certifications yet. Add one!</p>
      )}
      <div className="space-y-2">
        {certs.map(c => (
          <div key={c.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
            <div>
              <p className="text-sm font-medium text-white">{c.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "#52525b" }}>{c.issuer} · {c.date}</p>
            </div>
            <div className="flex gap-2">
              <Btn small variant="ghost" onClick={() => setEditing(c)}>Edit</Btn>
              <Btn small variant="danger" onClick={() => remove(c.id)}>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
      {editing !== null && (
        <Modal title={editing.id ? "Edit Cert" : "Add Certification"} onClose={() => setEditing(null)}>
          <CertForm initial={editing} onSave={save} onClose={() => setEditing(null)} />
        </Modal>
      )}
    </div>
  );
}

function CertForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({ name: "", issuer: "", date: "", url: "", ...initial });
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <>
      <Field label="Certificate Name"><Input value={form.name} onChange={f("name")} placeholder="AWS Solutions Architect" /></Field>
      <Field label="Issuing Organization"><Input value={form.issuer} onChange={f("issuer")} placeholder="Amazon Web Services" /></Field>
      <Field label="Date"><Input value={form.date} onChange={f("date")} placeholder="2025-06" /></Field>
      <Field label="Credential URL"><Input value={form.url} onChange={f("url")} placeholder="https://..." /></Field>
      <div className="flex gap-3 mt-6"><Btn onClick={() => onSave(form)}>Save</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </>
  );
}

// ── Skills Tab ─────────────────────────────────────────────────────────────
function SkillsTab({ data, updateSection }) {
  const [newSkill, setNewSkill] = useState({ name: "", category: "Languages" });
  const skills = data.skills || [];
  const CATS = ["Languages","Frameworks","Databases","Cloud/Infra","AI/ML","Tools","Methodologies"];
  const add = () => {
    if (!newSkill.name.trim()) return;
    updateSection("skills", [...skills, newSkill]);
    setNewSkill({ name: "", category: "Languages" });
  };
  const remove = (name) => updateSection("skills", skills.filter(s => s.name !== name));

  return (
    <div>
      <p className="text-sm font-semibold text-white mb-4">Skills ({skills.length})</p>
      {/* Add form */}
      <div className="flex gap-2 mb-6">
        <input style={{ ...inputStyle, flex: 1 }} value={newSkill.name}
          onChange={e => setNewSkill(p => ({ ...p, name: e.target.value }))}
          placeholder="Skill name" onKeyDown={e => e.key === "Enter" && add()} />
        <select style={{ ...inputStyle, width: "auto" }} value={newSkill.category}
          onChange={e => setNewSkill(p => ({ ...p, category: e.target.value }))}>
          {CATS.map(c => <option key={c}>{c}</option>)}
        </select>
        <Btn onClick={add}>Add</Btn>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map(s => (
          <span key={s.name} className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono"
            style={{ background: "#111", border: "1px solid #1a1a1a", color: "#a1a1aa" }}>
            {s.name}
            <button onClick={() => remove(s.name)} className="hover:text-red-400 transition-colors">✕</button>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main AdminPanel ────────────────────────────────────────────────────────
const TABS = ["Projects", "Experience", "Education", "Certifications", "Skills"];

export default function AdminPanel() {
  const { authed, login, logout } = useAdminAuth();
  const { data, updateSection, exportJSON, importJSON, resetToDefault } = usePortfolioData();
  const [activeTab, setActiveTab] = useState("Projects");
  const [importMsg, setImportMsg] = useState("");

  if (!authed) return <LoginScreen onLogin={login} />;

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { await importJSON(file); setImportMsg("Imported!"); setTimeout(() => setImportMsg(""), 2000); }
    catch { setImportMsg("Invalid JSON"); setTimeout(() => setImportMsg(""), 2000); }
  };

  return (
    <div className="min-h-screen" style={{ background: "#000" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-40" style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}
          className="h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs" style={{ color: "#52525b" }}>← Portfolio</a>
            <span style={{ color: "#1a1a1a" }}>|</span>
            <span className="text-sm font-bold text-white">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            {importMsg && <span className="text-xs" style={{ color: "#4ade80" }}>{importMsg}</span>}
            <label className="cursor-pointer">
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
              <span className="text-xs px-3 py-1.5 rounded-lg cursor-pointer"
                style={{ border: "1px solid #1a1a1a", color: "#a1a1aa" }}>Import JSON</span>
            </label>
            <Btn small variant="success" onClick={exportJSON}>Export JSON</Btn>
            <Btn small variant="danger" onClick={() => { if (window.confirm("Reset all data to defaults?")) resetToDefault(); }}>Reset</Btn>
            <Btn small variant="ghost" onClick={logout}>Logout</Btn>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl" style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", width: "fit-content" }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
              style={activeTab === tab
                ? { background: "#6366f1", color: "#fff" }
                : { background: "transparent", color: "#52525b" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6 rounded-2xl" style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}>
          {activeTab === "Projects"       && <ProjectsTab data={data} updateSection={updateSection} />}
          {activeTab === "Experience"     && <ExperienceTab data={data} updateSection={updateSection} />}
          {activeTab === "Education"      && <EducationTab data={data} updateSection={updateSection} />}
          {activeTab === "Certifications" && <CertificationsTab data={data} updateSection={updateSection} />}
          {activeTab === "Skills"         && <SkillsTab data={data} updateSection={updateSection} />}
        </div>
      </div>
    </div>
  );
}
