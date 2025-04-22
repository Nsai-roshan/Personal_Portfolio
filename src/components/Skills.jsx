const skills = [
    "HTML", "CSS", "JavaScript", "ReactJS", "Node.js",
    "Tailwind CSS", "PostgreSQL", "MongoDB", "Neo4j", "AWS", "Python", "C++", "Java", "SQL","Django",
    "Flask", "Express.js", "Git", "GitHub", "REST APIs", "Data Structures", "Algorithms", "Python-libraries",
    "Machine Learning", "Docker", "GraphQL", "Figma", "Agile Methodologies", "Responsive Design",
  ];
  
  export default function Skills() {
    return (
      <section id="skills" className="min-h-screen px-6 py-20"  data-aos="zoom-in">
      <div className="text-black">
      <h2 className="text-4xl font-bold text-center mb-10 text-black dark:text-white">Skills</h2>
      </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center text-gray-800 font-semibold hover:shadow-lg transition">
              {skill}
            </div>
          ))}
        </div>
      </section>
    );
  }
  