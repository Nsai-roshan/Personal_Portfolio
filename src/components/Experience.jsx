import usePortfolioData from "../hooks/usePortfolioData";

function formatDateRange(start, end, isCurrent) {
  const fmt = (d) => {
    if (!d) return "Present";
    const [y, m] = d.split("-");
    return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(m)-1]} ${y}`;
  };
  return `${fmt(start)} - ${isCurrent ? "Present" : fmt(end)}`;
}

export default function Experience() {
  const { data } = usePortfolioData();
  const experiences = data?.experiences || [];

  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <p className="section-label" data-aos="fade-up">04 · Career</p>
        <h2 className="section-title mb-16" data-aos="fade-up" data-aos-delay="50">Experience</h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #6366f1, #1a1a1a)", marginLeft: "7px" }}
          />

          <div className="space-y-12 pl-10">
            {experiences.map((exp, i) => (
              <div key={exp.id} data-aos="fade-up" data-aos-delay={i * 80} className="relative">
                {/* Timeline dot */}
                <div
                  className="absolute -left-10 top-1 w-3.5 h-3.5 rounded-full border-2"
                  style={{
                    borderColor: "#6366f1",
                    background: i === 0 ? "#6366f1" : "#000",
                    marginLeft: "1px",
                  }}
                />

                {/* Card */}
                <div className="rounded-xl p-6" style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{exp.job_title}</h3>
                      <p className="text-sm font-medium" style={{ color: "#6366f1" }}>{exp.company}</p>
                    </div>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-mono shrink-0"
                      style={{ background: "#111", border: "1px solid #1a1a1a", color: "#52525b" }}
                    >
                      {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {exp.bullets.slice(0, 3).map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm" style={{ color: "#a1a1aa" }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "#6366f1" }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Skills used */}
                  {exp.skills_used?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.skills_used.slice(0, 6).map(s => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded text-xs font-mono"
                          style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
