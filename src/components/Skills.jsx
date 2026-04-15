import { useState } from "react";
import usePortfolioData from "../hooks/usePortfolioData";

const CATEGORY_ORDER = ["Languages", "Frameworks", "Databases", "Cloud/Infra", "AI/ML", "Tools", "Methodologies"];

const CATEGORY_META = {
  "Languages":     { icon: "< >", color: "#82aaff" },
  "Frameworks":    { icon: "{ }", color: "#c3e88d" },
  "Databases":     { icon: "DB",  color: "#f78c6c" },
  "Cloud/Infra":   { icon: "☁",   color: "#89ddff" },
  "AI/ML":         { icon: "🤖",  color: "#c792ea" },
  "Tools":         { icon: "⚙",   color: "#ffcb6b" },
  "Methodologies": { icon: "◈",   color: "#ff9cac" },
};

export default function Skills() {
  const { data } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState("All");

  const skills = data?.skills || [];
  const categories = ["All", ...CATEGORY_ORDER.filter(c => skills.some(s => s.category === c))];

  const filtered = activeCategory === "All"
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const grouped = {};
  filtered.forEach(s => {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(s);
  });

  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <p className="section-label" data-aos="fade-up">02 · Skills</p>
        <h2 className="section-title mb-10" data-aos="fade-up" data-aos-delay="50">Tech Stack</h2>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10" data-aos="fade-up" data-aos-delay="100">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all"
              style={
                activeCategory === cat
                  ? { background: "#6366f1", color: "#fff", border: "1px solid #6366f1" }
                  : { background: "transparent", color: "#52525b", border: "1px solid #1a1a1a" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid by category */}
        <div className="space-y-8">
          {(activeCategory === "All" ? CATEGORY_ORDER : [activeCategory])
            .filter(cat => grouped[cat]?.length)
            .map(cat => {
              const meta = CATEGORY_META[cat] || { icon: "•", color: "#a1a1aa" };
              return (
                <div key={cat} data-aos="fade-up">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-2 py-0.5 rounded font-mono"
                      style={{ color: meta.color, background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}>
                      {meta.icon}
                    </span>
                    <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#52525b" }}>
                      {cat}
                    </span>
                    <span className="text-xs" style={{ color: "#2a2a2a" }}>·· {grouped[cat].length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {grouped[cat].map(({ name }) => (
                      <span
                        key={name}
                        className="px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors"
                        style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", color: "#a1a1aa" }}
                        onMouseEnter={e => { e.target.style.borderColor = meta.color; e.target.style.color = meta.color; }}
                        onMouseLeave={e => { e.target.style.borderColor = "#1a1a1a"; e.target.style.color = "#a1a1aa"; }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
