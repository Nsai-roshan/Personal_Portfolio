import { useEffect, useRef } from "react";
import AOS from "aos";

export default function Section({ id, children }) {
  const ref = useRef();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className="section py-20 px-6 transition-colors duration-300"
      data-aos="fade-up"
    >
      {children}
    </section>
  );
}
