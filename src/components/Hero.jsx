export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center pt-14"
    >
      <div className="section-container w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-20">

        {/* LEFT: Text */}
        <div className="flex-1 text-center lg:text-left" data-aos="fade-right">

          {/* Headshot */}
          {/* <div className="flex justify-center lg:justify-start mb-6">
            <div className="relative">
              <img
                src="/headshot.jpg"
                alt="Sai Roshan Rao"
                className="rounded-full object-cover"
                style={{
                  width: 96,
                  height: 96,
                  border: "2px solid rgba(99,102,241,0.4)",
                  boxShadow: "0 0 0 4px rgba(99,102,241,0.08), 0 0 30px rgba(99,102,241,0.2)",
                }}
              /> */}
              {/* Online indicator dot */}
              {/* <span
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-black"
                style={{ boxShadow: "0 0 8px rgba(74,222,128,0.6)" }}
              />
            </div>
          </div> */}

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
            style={{
              borderColor: "rgba(74,222,128,0.3)",
              background: "rgba(74,222,128,0.05)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400 tracking-wide">
              Open to opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            className="font-black leading-none mb-4"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: "-2px", color: "#fff" }}
          >
            Sai Roshan<br />
            <span className="gradient-text">Rao.</span>
          </h1>

          {/* Role */}
          <p className="text-lg font-medium mb-3" style={{ color: "#a1a1aa" }}>
            Software Engineer · AI · Distributed Systems
          </p>
          <p
            className="text-sm mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed"
            style={{ color: "#52525b" }}
          >
            MS CS @ Arizona State University · GPA 4.0<br />
            Building systems that scale - from distributed KV stores to LLM pipelines.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#projects"
              className="btn-glow px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ border: "1px solid #1a1a1a", color: "#a1a1aa" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#6366f1";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1a1a1a";
                e.currentTarget.style.color = "#a1a1aa";
              }}
            >
              Get in Touch
            </a>
            <a
              href={`${process.env.PUBLIC_URL}/SaiRoshanRao_Nelavalli.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ border: "1px solid #1a1a1a", color: "#a1a1aa" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#6366f1";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1a1a1a";
                e.currentTarget.style.color = "#a1a1aa";
              }}
            >
              Resume ↓
            </a>
          </div>
        </div>

        {/* RIGHT: Terminal */}
        <div className="flex-1 w-full max-w-md lg:max-w-none" data-aos="fade-left">
          <div className="terminal-window">
            <div className="terminal-bar">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span
                className="ml-3 text-xs"
                style={{ color: "#484f58", fontFamily: "monospace" }}
              >
                ~/portfolio - profile.js
              </span>
            </div>
            <div className="terminal-body">
              <div><span className="t-comment">{'// Hello, world. Let me introduce myself.'}</span></div>
              <div>&nbsp;</div>
              <div><span className="t-keyword">const</span> <span className="t-fn">me</span> = {"{"}</div>
              <div>&nbsp;&nbsp;<span className="t-fn">name</span>: <span className="t-string">"Sai Roshan Rao Nelavalli"</span>,</div>
              <div>&nbsp;&nbsp;<span className="t-fn">role</span>: <span className="t-string">"Software Engineer"</span>,</div>
              <div>&nbsp;&nbsp;<span className="t-fn">stack</span>: [<span className="t-string">"Go"</span>, <span className="t-string">"Python"</span>, <span className="t-string">"React"</span>, <span className="t-string">"C++"</span>],</div>
              <div>&nbsp;&nbsp;<span className="t-fn">focus</span>: [<span className="t-string">"Distributed Systems"</span>, <span className="t-string">"AI/ML"</span>],</div>
              <div>&nbsp;&nbsp;<span className="t-fn">location</span>: <span className="t-string">"Tempe, AZ"</span>,</div>
              <div>&nbsp;&nbsp;<span className="t-fn">education</span>: <span className="t-string">"MS CS @ ASU (GPA 4.0)"</span>,</div>
              <div>&nbsp;&nbsp;<span className="t-fn">available</span>: <span className="t-bool">true</span>,</div>
              <div>&nbsp;&nbsp;<span className="t-fn">f1_opt</span>: <span className="t-bool">true</span></div>
              <div>{"}"};</div>
              <div>&nbsp;</div>
              <div>
                <span className="t-fn">me</span>.<span className="t-fn">hire</span>();
                <span className="t-cursor" />
              </div>
            </div>
          </div>

          {/* Stats row below terminal */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { value: "24+", label: "Projects"    },
              { value: "4.0", label: "MS GPA"      },
              { value: "2+",  label: "Internships" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="text-center py-3 rounded-lg"
                style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}
              >
                <div className="text-lg font-bold text-white">{value}</div>
                <div className="text-xs" style={{ color: "#52525b" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: "#52525b" }}
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
