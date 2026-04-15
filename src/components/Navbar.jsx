import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education"  },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Floating pill navbar */}
      <nav
        className="fixed top-4 left-1/2 z-50 transition-all duration-300"
        style={{ transform: "translateX(-50%)" }}
      >
        <div
          className="flex items-center gap-1 px-2 py-2"
          style={{
            borderRadius: 9999,
            background: scrolled
              ? "rgba(8,8,8,0.92)"
              : "rgba(10,10,10,0.75)",
            border: "1px solid rgba(99,102,241,0.18)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="text-xs font-black tracking-widest px-3 py-1.5 rounded-full mr-1"
            style={{
              color: "#6366f1",
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.15)",
              letterSpacing: "0.15em",
            }}
          >
            SR
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <li key={label}>
                  <a
                    href={href}
                    className="block px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200"
                    style={
                      isActive
                        ? {
                            color: "#fff",
                            background: "rgba(99,102,241,0.18)",
                            boxShadow: "0 0 12px rgba(99,102,241,0.25)",
                          }
                        : { color: "#71717a" }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#e4e4e7";
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#71717a";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden px-2 py-1.5 rounded-full transition-colors"
            style={{ color: "#71717a" }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#e4e4e7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#71717a"; }}
          >
            {open ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div
            className="md:hidden mt-2 px-3 py-3 flex flex-col gap-1"
            style={{
              borderRadius: 20,
              background: "rgba(8,8,8,0.95)",
              border: "1px solid rgba(99,102,241,0.18)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              minWidth: 180,
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-full text-sm transition-all duration-150"
                style={{ color: "#a1a1aa" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.12)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#a1a1aa"; }}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
