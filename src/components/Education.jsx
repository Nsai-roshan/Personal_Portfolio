import usePortfolioData from "../hooks/usePortfolioData";

function formatYear(d) {
  if (!d) return "Present";
  return d.split("-")[0];
}

export default function Education() {
  const { data } = usePortfolioData();
  const education = data?.education || [];

  // Sort MS first
  const sorted = [...education].sort((a, b) => b.end_date?.localeCompare(a.end_date || "9999"));

  return (
    <section id="education" className="py-24">
      <div className="section-container">
        <p className="section-label" data-aos="fade-up">05 · Background</p>
        <h2 className="section-title mb-12" data-aos="fade-up" data-aos-delay="50">Education</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {sorted.map((edu, i) => (
            <div
              key={edu.id}
              className="rounded-xl p-6 relative overflow-hidden"
              style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              {/* Accent corner glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />

              {/* Degree type badge */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.25)" }}
                >
                  {edu.degree.includes("Master") ? "M.S." : "B.S."}
                </span>
                <span className="text-xs font-mono" style={{ color: "#52525b" }}>
                  {formatYear(edu.start_date)} - {formatYear(edu.end_date)}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{edu.degree}</h3>
              <p className="text-sm mb-1" style={{ color: "#6366f1" }}>{edu.institution}</p>

              {/* GPA */}
              <div className="flex items-center gap-2 mt-3 mb-5">
                <span className="text-xs" style={{ color: "#52525b" }}>GPA</span>
                <span className="text-sm font-bold text-white font-mono">{edu.gpa}</span>
              </div>

              {/* Coursework */}
              {edu.coursework?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: "#52525b" }}>
                    Relevant Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map(c => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ background: "#111", border: "1px solid #1a1a1a", color: "#a1a1aa" }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
