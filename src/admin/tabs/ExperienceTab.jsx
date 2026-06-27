import { useState } from "react";
import { Field, Input, Textarea, Btn, Modal, SortableList } from "../adminShared";

const EMPTY = { job_title: "", company: "", start_date: "", end_date: "", is_current: false, bullets: [], skills_used: [] };

function ExpForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    ...EMPTY, ...initial,
    bullets: Array.isArray(initial.bullets) ? initial.bullets.join("\n") : "",
    skills_used: Array.isArray(initial.skills_used) ? initial.skills_used.join(", ") : "",
  });
  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const submit = () => onSave({
    ...form,
    bullets: form.bullets.split("\n").map((s) => s.trim()).filter(Boolean),
    skills_used: form.skills_used.split(",").map((s) => s.trim()).filter(Boolean),
    is_current: form.is_current === true || form.is_current === "true",
  });
  return (
    <Modal title={form.id ? "Edit Experience" : "Add Experience"} onClose={onClose} wide>
      <Field label="Job Title"><Input value={form.job_title} onChange={f("job_title")} placeholder="Software Engineer Intern" /></Field>
      <Field label="Company"><Input value={form.company} onChange={f("company")} placeholder="Company Name" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start Date"><Input value={form.start_date} onChange={f("start_date")} placeholder="2024-01" /></Field>
        <Field label="End Date" hint="Leave blank if current role"><Input value={form.end_date} onChange={f("end_date")} placeholder="2024-12" /></Field>
      </div>
      <Field label="Bullet Points" hint="One per line"><Textarea minRows={5} value={form.bullets} onChange={f("bullets")} placeholder="Led development of..." /></Field>
      <Field label="Skills Used" hint="Comma-separated"><Input value={form.skills_used} onChange={f("skills_used")} placeholder="React, Go, PostgreSQL" /></Field>
      <div className="flex gap-3 mt-2"><Btn onClick={submit}>Save</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

export default function ExperienceTab({ data, updateSection }) {
  const [editing, setEditing] = useState(null);
  const exps = data.experiences || [];

  const save = (exp) => {
    if (exp.id && exps.find((e) => e.id === exp.id)) {
      updateSection("experiences", exps.map((e) => (e.id === exp.id ? exp : e)));
    } else {
      updateSection("experiences", [{ ...exp, id: "exp_" + Date.now() }, ...exps]);
    }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Experience ({exps.length})</p>
        <Btn onClick={() => setEditing(EMPTY)}>+ Add</Btn>
      </div>
      <SortableList
        items={exps}
        onReorder={(next) => updateSection("experiences", next)}
        renderItem={(exp) => (
          <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="text-sm font-medium text-white truncate">{exp.job_title}</p>
              <p className="text-xs mt-0.5" style={{ color: "#52525b" }}>{exp.company} &middot; {exp.start_date}{exp.end_date ? ` - ${exp.end_date}` : " - Present"}</p>
            </div>
            <div className="flex gap-2 ml-3 shrink-0">
              <Btn small variant="ghost" onClick={() => setEditing(exp)}>Edit</Btn>
              <Btn small variant="danger" onClick={() => updateSection("experiences", exps.filter((e) => e.id !== exp.id))}>Del</Btn>
            </div>
          </div>
        )}
      />
      {editing !== null && <ExpForm initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </div>
  );
}