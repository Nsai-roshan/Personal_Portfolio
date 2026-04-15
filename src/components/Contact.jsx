export default function Contact() {
  const links = [
    {
      label: "Email",
      value: "snelaval@asu.edu",
      href: "mailto:snelaval@asu.edu",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "Nsai-roshan",
      href: "https://github.com/Nsai-roshan",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "sai-roshan-rao-nelavalli",
      href: "https://linkedin.com/in/sai-roshan-rao-nelavalli-361652207",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="section-container max-w-2xl">
        <p className="section-label text-center" data-aos="fade-up">07 · Say Hello</p>
        <h2 className="section-title text-center mb-4" data-aos="fade-up" data-aos-delay="50">
          Get In Touch
        </h2>
        <p className="text-center text-sm mb-12 leading-relaxed" style={{ color: "#52525b" }} data-aos="fade-up" data-aos-delay="100">
          I'm actively looking for new opportunities. Whether it's a role, a project,
          or just a chat - my inbox is open.
        </p>

        {/* Contact cards */}
        <div className="space-y-3" data-aos="fade-up" data-aos-delay="150">
          {links.map(({ label, value, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl transition-all"
              style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", textDecoration: "none" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a1a"}
            >
              <span style={{ color: "#6366f1" }}>{icon}</span>
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase mb-0.5" style={{ color: "#52525b" }}>
                  {label}
                </p>
                <p className="text-sm font-medium text-white">{value}</p>
              </div>
              <svg className="w-4 h-4 ml-auto" style={{ color: "#52525b" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>

        {/* Resume download */}
        <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="200">
          <a
            href={`${process.env.PUBLIC_URL}/SaiRoshanRao_Nelavalli.pdf`}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#6366f1" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-16" style={{ color: "#2a2a2a" }}>
          Built by Sai Roshan Rao · {new Date().getFullYear()}
          {" · "}
          <a href="/admin" className="hover:underline" style={{ color: "#2a2a2a" }}>Admin</a>
        </p>
      </div>
    </section>
  );
}
