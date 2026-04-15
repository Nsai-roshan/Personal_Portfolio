import { useState } from "react";
import usePortfolioData from "../hooks/usePortfolioData";

const FILTERS = [
  { label: "All", tag: "all" },
  { label: "Distributed Systems", tag: "distributed-systems" },
  { label: "AI / ML", tag: "AI/ML" },
  { label: "Full-Stack", tag: "full-stack" },
  { label: "Data Eng", tag: "data-engineering" },
  { label: "Systems", tag: "systems" },
];

const CATEGORY_TAGS = [
  "distributed-systems","AI/ML","full-stack","systems","data-engineering","backend","SWE",
  "real-time","infrastructure","EDA","data-analyst","devops","agentic","LLM","RAG","C++/EDA",
  "networking","algorithms","hardware","embedded-systems","ML","capstone","performance","cloud",
  "teaching","problem-solving","static-analysis","QA","automation","testing","software-quality",
  "data-analyst",
];

function formatDate(d) {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(m)-1]} ${y}`;
}

export default function Projects() {
  const { data } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const projects = data?.projects || [];
  const filtered = activeFilter === "all"
    ? projects
    : projects.filter(p => p.tech_stack?.includes(activeFilter));

  const visible = showAll ? filtered : filtered.slice(0, 9);

  return (
    <section id="projects" className="py-24">
      <div className="section-container">
        <p className="section-label" data-aos="fade-up">03 · Work</p>
        <h2 className="section-title mb-10" data-aos="fade-up" data-aos-delay="50">Projects</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10" data-aos="fade-up" data-aos-delay="100">
          {FILTERS.map(({ label, tag }) => (
            <button
              key={tag}
              onClick={() => { setActiveFilter(tag); setShowAll(false); }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                activeFilter === tag
                  ? { background: "#6366f1", color: "#fff", border: "1px solid #6366f1" }
                  : { background: "transparent", color: "#52525b", border: "1px solid #1a1a1a" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {visible.map((proj, i) => {
            const isInProgress = !proj.end_date;
            const realTech = proj.tech_stack?.filter(t => !CATEGORY_TAGS.includes(t)) || [];

            return (
              <div
                key={proj.id}
                className="rounded-xl overflow-hidden card-hover"
                style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}
                data-aos="fade-up"
                data-aos-delay={Math.min(i * 50, 300)}
              >
                {/* Card header - IDE tab style */}
                <div className="flex items-center justify-between px-4 py-3"
                  style={{ background: "#111", borderBottom: "1px solid #1a1a1a" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono" style={{ color: "#484f58" }}>~/</span>
                    <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                      {proj.title}
                    </span>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                    style={
                      isInProgress
                        ? { background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.3)" }
                        : { background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }
                    }
                  >
                    {isInProgress ? "In Progress" : "Completed"}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#a1a1aa" }}>
                    {proj.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {realTech.slice(0, 6).map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{ background: "#1a1a1a", color: "#52525b" }}
                      >
                        {t}
                      </span>
                    ))}
                    {realTech.length > 6 && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ color: "#2a2a2a" }}>
                        +{realTech.length - 6}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#2a2a2a" }}>
                      {formatDate(proj.start_date)} - {formatDate(proj.end_date)}
                    </span>
                    {proj.url && proj.url !== "https://github.com/Nsai-roshan" ? (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                        style={{ color: "#52525b" }}
                        onMouseEnter={e => e.target.style.color = "#6366f1"}
                        onMouseLeave={e => e.target.style.color = "#52525b"}
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        GitHub
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more */}
        {filtered.length > 9 && !showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{ border: "1px solid #1a1a1a", color: "#a1a1aa" }}
              onMouseEnter={e => { e.target.style.borderColor = "#6366f1"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#1a1a1a"; e.target.style.color = "#a1a1aa"; }}
            >
              Show all {filtered.length} projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
