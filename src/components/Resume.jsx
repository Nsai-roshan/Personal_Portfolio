export default function Resume() {
  const pdfPath = `${process.env.PUBLIC_URL}/SaiRoshanRao_Nelavalli.pdf`;

  return (
    <section id="resume" className="min-h-screen px-6 py-20 flex flex-col items-center" data-aos="zoom-out">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">My Resume</h2>

      {/* Embedded resume viewer */}
      <div className="w-full max-w-4xl h-[750px] border border-gray-300 dark:border-gray-600 shadow-lg mb-6">
        <iframe
          src={pdfPath}
          title="Sai Roshan Resume"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Download + View buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href={pdfPath}
          download
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Download Resume
        </a>
        <a
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white px-5 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          View Full Screen
        </a>
      </div>
    </section>
  );
}
