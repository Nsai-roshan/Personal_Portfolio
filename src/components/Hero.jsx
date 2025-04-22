export default function Hero() {
    return (
          <section
            id="hero"
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20"
            data-aos="zoom-out"
          >
            <img
              src="/headshot.jpg"
              alt="Sai Roshan"
              className="w-36 h-36 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md mb-6"
            />

            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Hi, I'm Sai Roshan 👋
            </h1>

            <p className="text-xl max-w-2xl text-gray-700 dark:text-gray-300 mb-6">
              Software Developer · AI Enthusiast · Full-Stack Engineer <br />
              Building scalable apps, automating workflows, and solving real-world problems.
            </p>

            <div className="flex gap-4">
              <a
                href="#projects"
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Let’s Connect
              </a>
            </div>
    </section>

    );
  }
  