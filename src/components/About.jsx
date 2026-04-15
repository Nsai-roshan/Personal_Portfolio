export default function About() {
  const highlights = [
    { icon: "⚡", text: "Distributed systems & backend infrastructure" },
    { icon: "🤖", text: "AI/ML pipelines & LLM orchestration" },
    { icon: "🔧", text: "Systems programming (Go, C++, C)" },
    { icon: "📊", text: "Data engineering at scale" },
  ];

  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: Photo */}
          <div className="flex-shrink-0 flex justify-center lg:justify-start" data-aos="fade-right">
            <div
              className="relative"
              style={{ width: 300, height: 300 }}
            >
              <img
                src="/headshot.jpeg"
                alt="Sai Roshan Rao"
                className="object-cover object-top"
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: 16,
                  border: "1px solid rgba(99,102,241,0.3)",
                  boxShadow: "0 0 0 1px rgba(99,102,241,0.08), 0 0 40px rgba(99,102,241,0.15), 0 20px 60px rgba(0,0,0,0.5)",
                }}
              />
              {/* Corner accent */}
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  left: -1,
                  width: 40,
                  height: 40,
                  borderTop: "2px solid #6366f1",
                  borderLeft: "2px solid #6366f1",
                  borderRadius: "16px 0 0 0",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 40,
                  height: 40,
                  borderBottom: "2px solid #6366f1",
                  borderRight: "2px solid #6366f1",
                  borderRadius: "0 0 16px 0",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Middle: bio */}
          <div className="flex-1" data-aos="fade-up">
            <p className="section-label">01 · About</p>
            <h2 className="section-title mb-6">Who I am</h2>
            <div
              className="space-y-4 text-sm leading-relaxed"
              style={{ color: "#a1a1aa" }}
            >
              <p>
                I'm a Computer Science graduate student at Arizona State University
                (MS, GPA 4.0, Dec 2025) with production engineering experience and a
                deep project portfolio spanning distributed systems, AI/ML, backend
                engineering, VLSI/EDA tooling, and data engineering.
              </p>
              <p>
                I've built things like a Raft-consensus KV store in Go, a real-time
                collaborative code editor with CRDTs, RAG systems over 30,000+
                documents, Linux Kernel Modules, and VLSI physical design tools -
                because I believe the best way to understand something is to build it
                from scratch.
              </p>
              <p>
                Currently on F1/OPT and available to start immediately. Looking for
                roles in software engineering, distributed systems, or AI/ML
                infrastructure.
              </p>
            </div>
          </div>

          {/* Right: highlights + links */}
          <div className="flex-1" data-aos="fade-left">
            <p className="section-label">What I focus on</p>
            <div className="space-y-3 mt-6">
              {highlights.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-4 p-4 rounded-xl transition-colors"
                  style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium" style={{ color: "#a1a1aa" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://github.com/Nsai-roshan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  color: "#a1a1aa",
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/sai-roshan-rao-nelavalli-361652207"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  color: "#a1a1aa",
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
