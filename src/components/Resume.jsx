export default function Resume() {
    return (
      <section id="resume" className="min-h-screen px-6 py-20 flex flex-col items-center"  data-aos="zoom-out">
        <h2 className="text-4xl font-bold text-grey-800 mb-6">My Resume</h2>
  
        {/* Embedded resume viewer */}
        <div className="w-full max-w-4xl h-[750px] border shadow-lg mb-6">
          <iframe
            src="/SaiRoshanRao_Nelavalli.pdf"
            title="Sai Roshan Resume"
            className="w-full h-full"
          ></iframe>
        </div>
  
        {/* Download + View buttons */}
        <div className="flex gap-4">
          <a
            href="/SaiRoshanRao_Nelavalli.pdf"
            download
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Download Resume
          </a>
          <a
            href="/SaiRoshanRao_Nelavalli.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-300 transition"
          >
            View Full Screen
          </a>
        </div>
      </section>
    );
  }
  