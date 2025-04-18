// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Skills from "./components/Skills";
// import Projects from "./components/Projects";
// import Resume from "./components/Resume";
// import Contact from "./components/Contact";
// import Section from "./components/Section";
// import Background from "./components/Background";

// function App() {
//   const [darkMode, setDarkMode] = useState(true);

//   useEffect(() => {
//     AOS.init({ duration: 800, mirror: true, once: false });
//   }, []);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };


//   return (
//     <div className={`${darkMode ? "dark" : ""}`}>
//     <div className="relative overflow-hidden min-h-screen">
//       {/* 🔮 Gradient background at the very back */}
//       <div className="absolute top-0 left-0 w-full h-full -z-20 bg-gradient-to-b from-black via-purple-900 via-40% via-blue-600 via-70% to-white" />

//       {/* 🎇 Interactive particles in front of gradient */}
//       <Background />

//       {/* 🧾 Main content on top */}
//       <div className="relative z-10">
//         <Navbar />

//         {/* Use text-white or text-black in each section as needed */}
//         <Section id="hero">
//           <div className="text-white">
//             <Hero />
//           </div>
//         </Section>

//         <Section id="about">
//           <div className="text-white">
//             <About />
//           </div>
//         </Section>

//         <Section id="skills">
//           <div className="text-white">
//             <Skills />
//           </div>
//         </Section>

//         <Section id="projects">
//           <div className="text-white">
//             <Projects />
//           </div>
//         </Section>

//         <Section id="resume">
//           <div className="text-black">
//             <Resume />
//           </div>
//         </Section>

//         <Section id="contact">
//           <div className="text-black">
//             <Contact />
//           </div>
//         </Section>
//       </div>
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Section from "./components/Section";
import Background from "./components/Background";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, mirror: true, once: false });
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative overflow-hidden min-h-screen transition-colors duration-500">
        <div
          className={`absolute top-0 left-0 w-full h-full -z-20 transition-all duration-500 ${
            darkMode
              ? "bg-gradient-to-b from-black via-blue-900 via-60% to-purple-800"
              : "bg-gradient-to-b from-white via-pink-100 via-40% via-yellow-100 via-70% to-sky-100"
          }`}
        />


        <Background darkMode={darkMode} />

        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-sm font-semibold dark:text-white text-black shadow-md"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="relative z-10 text-black dark:text-white">
          <Navbar />
          <Section id="hero"><Hero /></Section>
          <Section id="about"><About /></Section>
          <Section id="skills"><Skills /></Section>
          <Section id="projects"><Projects /></Section>
          <Section id="resume"><Resume /></Section>
          <Section id="contact"><Contact /></Section>
        </div>
      </div>
    </div>
  );
}

export default App;

