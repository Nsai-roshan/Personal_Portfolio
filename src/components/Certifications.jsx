import usePortfolioData from "../hooks/usePortfolioData";

export default function Certifications() {
  const { data } = usePortfolioData();
  const certs = data?.certifications || [];

  if (certs.length === 0) {
    return (
      <section id="certifications" className="py-16">
        <div className="section-container">
          <p className="section-label" data-aos="fade-up">06 · Credentials</p>
          <h2 className="section-title mb-8" data-aos="fade-up" data-aos-delay="50">Certifications</h2>
          <div className="rounded-xl p-10 text-center" style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderStyle: "dashed" }} data-aos="fade-up">
            <p className="text-sm mb-4" style={{ color: "#52525b" }}>No certifications added yet.</p>
            <a href="/admin" className="text-xs font-medium px-4 py-2 rounded-lg transition-colors"
              style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}>
              Add via Admin Panel &#x2192;
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-24">
      <div className="section-container">
        <p className="section-label" data-aos="fade-up">06 · Credentials</p>
        <h2 className="section-title mb-12" data-aos="fade-up" data-aos-delay="50">Certifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <a key={cert.id} href={cert.url || "#"} target="_blank" rel="noopener noreferrer"
              className="rounded-xl p-5 transition-all block" data-aos="fade-up" data-aos-delay={i * 60}
              style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1a1a1a")}>
              <div className="flex items-start gap-4">
                {cert.image
                  ? <img src={cert.image} alt={cert.name} style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 8, background: "#111", flexShrink: 0 }} />
                  : <div style={{ width: 48, height: 48, borderRadius: 8, background: "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>&#x1F3C6;</div>
                }
                <div style={{ minWidth: 0 }}>
                  <h3 className="text-sm font-bold text-white mb-1 leading-snug">{cert.name}</h3>
                  <p className="text-xs" style={{ color: "#6366f1" }}>{cert.issuer}</p>
                  <p className="text-xs mt-1.5 font-mono" style={{ color: "#52525b" }}>{cert.date}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}