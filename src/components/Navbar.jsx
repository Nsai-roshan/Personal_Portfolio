import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full px-9 py-3 shadow-md w-fit max-w-[95%]" >
      <div className="flex items-center w-full gap-10">
        {/* Name / Logo */}
        <h1 className="text-lg font-bold text-black dark:text-white mr-10 min-w-[120px] whitespace-nowrap">Sai Roshan Rao</h1>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex gap-8 text-sm font-medium text-black dark:text-white ml-auto">
          <li><a href="#hero" className="hover:underline hover:rounded-full hover:px-4 hover:py-2 hover:bg-blue-300 dark:hover:bg-blue-800">Home</a></li>
          <li><a href="#about" className="hover:underline hover:rounded-full hover:px-4 hover:py-2 hover:bg-blue-300 dark:hover:bg-blue-800">About</a></li>
          <li><a href="#skills" className="hover:underline hover:rounded-full hover:px-4 hover:py-2 hover:bg-blue-300 dark:hover:bg-blue-800">Skills</a></li>
          <li><a href="#projects" className="hover:underline hover:rounded-full hover:px-4 hover:py-2 hover:bg-blue-300 dark:hover:bg-blue-800">Projects</a></li>
          <li><a href="#resume" className="hover:underline hover:rounded-full hover:px-4 hover:py-2 hover:bg-blue-300 dark:hover:bg-blue-800">Resume</a></li>
          <li><a href="#contact" className="hover:underline hover:rounded-full hover:px-4 hover:py-2 hover:bg-blue-300 dark:hover:bg-blue-800">Contact</a></li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="sm:hidden ml-auto"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 text-black dark:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="sm:hidden mt-4 flex flex-col gap-3 text-sm font-medium text-black dark:text-white">
          <li><a href="#hero" className="hover:underline" onClick={toggleMenu}>Home</a></li>
          <li><a href="#about" className="hover:underline" onClick={toggleMenu}>About</a></li>
          <li><a href="#skills" className="hover:underline" onClick={toggleMenu}>Skills</a></li>
          <li><a href="#projects" className="hover:underline" onClick={toggleMenu}>Projects</a></li>
          <li><a href="#resume" className="hover:underline" onClick={toggleMenu}>Resume</a></li>
          <li><a href="#contact" className="hover:underline" onClick={toggleMenu}>Contact</a></li>
        </ul>
      )}
    </nav>
  );
}
