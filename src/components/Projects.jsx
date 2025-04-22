const projects = [
  {
    title: "AI Resume Analyzer",
    Status: "In Progress",
    description: "A web app that scans resumes, extracts keywords, and matches them with job descriptions using NLP.",
    tech: ["React", "Node.js", "OpenAI", "MongoDB"],
    // github: "Not Available",
    demo: "#",
  },
  {
    title: "Smart Sound to Speech Interpreter",
    Status: "Completed (discontinued)",
    description:
      "A real-time system that converts important audio notifications (like alarms) into speech. Built with spectrogram analysis, pyttsx3 TTS, and Flask frontend.",
    tech: ["Python", "Flask", "SQLite", "TTS", "Spectrogram"],
    github: "https://github.com/bkcho1/Smart-Sound-to-Speech-Interpreter-for-Security-and-Notification-Systems",
    demo: "#",
  },
  {
    title: "Fake News Detection using Machine Learning",
    Status: "Completed",
    description:
      "Built a deep learning model to detect fake news using NLP and TensorFlow. Achieved 90% accuracy using CNN and RNN architectures.",
    tech: ["Python", "TensorFlow", "NLP", "CNN", "RNN"],
    // github: "#",
    demo: "#",
  },
  {
    title: "E-Learning Lab (LMS)",
    Status: "Completed",
    description:
      "Built an LMS platform for underprivileged children using Django, PostgreSQL, Docker, and GitHub Actions. Included student login, progress tracking, and REST APIs.",
    tech: ["Django", "PostgreSQL", "HTML/CSS/JS", "Docker", "GitHub"],
    github: "https://github.com/Nsai-roshan/VirtualLearningLab",
    demo: "https://elearning-lab.org/",
  },
  {
    title: "Sun Devil Pizza Automation",
    Status: "Completed",
    description:
      "Developed a Java-based pizza ordering system with JavaFX UI. Focused on scalability, fault tolerance, and agile testing with Jira + GitHub.",
    tech: ["Java", "JavaFX", "HTML", "Agile", "Jira"],
    github: "https://github.com/Hauteknits/probable-octo-succotash",
    demo: "#",
  },
  {
    title: "Social Media Web App",
    Status: "Completed",
    description: "Built a Flask-based social media platform where users can register, log in, follow others, and interact through posts. Includes real-time dashboard and PostgreSQL-backed user management.",
    tech: ["Flask", "Python", "PostgreSQL", "HTML/CSS", "JavaScript"],
    github: "https://github.com/agarimel/DMBS-final-project",
    demo: "#",
  },
  {
    title: "Student Record Manager (C++)",
    Status: "Completed",
    description: "File-based project that manages student data through CRUD operations using C++.",
    tech: ["C++", "OOP", "File Handling"],
    // github: "#",
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
            className="bg-white dark:bg-white-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition text-grey dark:text-black relative"
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

            <div className="flex gap-4 items-center">
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

            <span
              className={`absolute bottom-4 right-4 text-sm font-medium px-3 py-1 rounded-full ${
                proj.Status.includes("Completed")
                  ? "bg-green-100 text-green-700"
                  : proj.Status.includes("discontinued")
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {proj.Status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
