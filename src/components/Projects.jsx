const projects = [
  {
    title: "AI Resume Analyzer",
    description: "A web app that scans resumes, extracts keywords, and matches them with job descriptions using NLP.",
    tech: ["React", "Node.js", "OpenAI", "MongoDB"],
    github: "https://github.com/yourusername/ai-resume-analyzer",
    demo: "https://resumeai-demo.vercel.app",
  },
  {
    title: "Smart Home IoT System",
    description: "Built an embedded system that lets users control devices remotely using NodeMCU + Firebase.",
    tech: ["C++", "Firebase", "IoT"],
    github: "https://github.com/yourusername/smart-home-iot",
    demo: "#",
  },
  {
    title: "Student Record Manager (C++)",
    description: "File-based project that manages student data through CRUD operations using C++.",
    tech: ["C++", "OOP", "File Handling"],
    github: "https://github.com/yourusername/student-record-manager",
    demo: "#",
  },
  {
    title: "Student Record Manager (C++)",
    description: "File-based project that manages student data through CRUD operations using C++.",
    tech: ["C++", "OOP", "File Handling"],
    github: "https://github.com/yourusername/student-record-manager",
    demo: "#",
  },
  {
    title: "Student Record Manager (C++)",
    description: "File-based project that manages student data through CRUD operations using C++.",
    tech: ["C++", "OOP", "File Handling"],
    github: "https://github.com/yourusername/student-record-manager",
    demo: "#",
  },
  {
    title: "Student Record Manager (C++)",
    description: "File-based project that manages student data through CRUD operations using C++.",
    tech: ["C++", "OOP", "File Handling"],
    github: "https://github.com/yourusername/student-record-manager",
    demo: "#",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen px-6 py-20" data-aos="zoom-in">
      <h2 className="text-4xl font-bold text-center mb-10 text-black dark:text-white">Projects</h2>

      <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto">
        {projects.map((proj, index) => (
          <div
            key={index}
            className="bg-white dark:bg-white-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition text-grey dark:text-black"
          >
            <h3 className="text-2xl font-bold mb-2">{proj.title}</h3>
            <p className="text-gray-700 dark:text-gray-700 mb-3">{proj.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {proj.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                GitHub
              </a>
              {proj.demo !== "#" && (
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
