import { useState } from "react";
import { iStyle, AdminSelect, Btn } from "../adminShared";

const CATS = ["Languages", "Frameworks", "Databases", "Cloud/Infra", "AI/ML", "Tools", "Methodologies"];

export default function SkillsTab({ data, updateSection }) {
  const skills = data.skills || [];
  const [newSkill, setNewSkill] = useState({ name: "", category: "Languages" });
  const [filter, setFilter] = useState("All");

  const add = () => {
    if (!newSkill.name.trim()) return;
    if (skills.find((s) => s.name.toLowerCase() === newSkill.name.trim().toLowerCase())) return;
    updateSection("skills", [...skills, { name: newSkill.name.trim(), category: newSkill.category }]);
    setNewSkill((p) => ({ ...p, name: "" }));
  };

  const remove = (name) => updateSection("skills", skills.filter((s) => s.name !== name));

  const grouped = CATS.reduce((acc, cat) => {
    const items = skills.filter((s) => s.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const displayCats = filter === "All" ? Object.keys(grouped) : [filter];

  return (
    <div>
      <p className="text-sm font-semibold text-white mb-6">Skills ({skills.length})</p>

      {/* Add row */}
      <div className="flex gap-2 mb-6">
        <input
          style={{ ...iStyle, flex: 1 }}
          value={newSkill.name}
          onChange={(e) => setNewSkill((p) => ({ ...p, name: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Skill name"
        />
        <AdminSelect
          value={newSkill.category}
          onChange={(e) => setNewSkill((p) => ({ ...p, category: e.target.value }))}
          style={{ ...iStyle, width: "auto" }}
        >
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </AdminSelect>
        <Btn onClick={add}>Add</Btn>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {["All", ...CATS].map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={filter === c ? { background: "#6366f1", color: "#fff" } : { background: "transparent", color: "#52525b", border: "1px solid #222" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Skills by category */}
      <div className="space-y-5">
        {displayCats.map((cat) => (
          <div key={cat}>
            <p className="text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: "#3a3a3a" }}>{cat}</p>
            <div className="flex flex-wrap gap-2">
              {(grouped[cat] || []).map((s) => (
                <span key={s.name} className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono"
                  style={{ background: "#111", border: "1px solid #1a1a1a", color: "#a1a1aa" }}>
                  {s.name}
                  <button onClick={() => remove(s.name)} style={{ background: "none", border: "none", color: "#3a3a3a", cursor: "pointer", padding: 0, lineHeight: 1 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#3a3a3a")}>
                    &#x2715;
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}