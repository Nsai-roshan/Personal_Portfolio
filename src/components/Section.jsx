export default function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`py-24 ${className}`}
    >
      {children}
    </section>
  );
}
