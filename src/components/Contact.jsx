import { Mail, Github, Linkedin } from "lucide-react"; // or use FontAwesome if preferred

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen px-6 py-20 flex flex-col items-center justify-center "  data-aos="zoom-in">
      <h2 className="text-4xl font-bold text-black-600 mb-6">Contact Me</h2>
      <p className="text-lg text-gray-700 dark:text-white mb-10 text-center">
        I'm open to new opportunities, collaborations, and internships. Feel free to reach out!
      </p>

      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <a href="mailto:snelaval@asu.edu" target="_blank" el="noopener noreferrer" className="flex items-center gap-2 text-blue-600 dark:text-white hover:underline">
          <Mail /> snelaval@asu.edu
        </a>
        <a href="https://github.com/Nsai-roshan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 dark:text-white hover:underline">
          <Github /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/sai-roshan-rao-nelavalli-361652207/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 dark:text-white hover:underline">
          <Linkedin /> LinkedIn
        </a>
      </div>
    </section>
  );
}
