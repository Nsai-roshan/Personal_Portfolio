import { useState } from "react";
import { Field, Input, Textarea, Btn, Modal, SortableList } from "../adminShared";

const EMPTY = { degree: "", institution: "", gpa: "", start_date: "", end_date: "", coursework: [] };

function EduForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    ...EMPTY, ...initial,
    coursework: Array.isArray(initial.coursework) ? initial.coursework.join(", ") : "",
  });
  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const submit = () => onSave({ ...form, coursework: form.coursework.split(",").map((s) => s.trim()).filter(Boolean) });
  return (
    <Modal title={form.id ? "Edit Education" : "Add Education"} onClose={onClose}>
      <Field label="Degree"><Input value={form.degree} onChange={f("degree")} placeholder="Bachelor of Science in Computer Science" /></Field>
      <Field label="Institution"><Input value={form.institution} onChange={f("institution")} placeholder="Arizona State University" /></Field>
      <Field label="GPA"><Input value={form.gpa} onChange={f("gpa")} placeholder="3.71 / 4.0" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start Date"><Input value={form.start_date} onChange={f("start_date")} placeholder="2021-08" /></Field>
        <Field label="End Date"><Input value={form.end_date} onChange={f("end_date")} placeholder="2024-12" /></Field>
      </div>
      <Field label="Coursework" hint="Comma-separated"><Textarea minRows={3} value={form.coursework} onChange={f("coursework")} placeholder="Data Structures, Algorithms, OS" /></Field>
      <div className="flex gap-3 mt-2"><Btn onClick={submit}>Save</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

export default function EducationTab({ data, updateSection }) {
  const [editing, setEditing] = useState(null);
  const edu = data.education || [];

  const save = (e) => {
    if (e.id && edu.find((x) => x.id === e.id)) {
      updateSection("education", edu.map((x) => (x.id === e.id ? e : x)));
    } else {
      updateSection("education", [{ ...e, id: "edu_" + Date.now() }, ...edu]);
    }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Education ({edu.length})</p>
        <Btn onClick={() => setEditing(EMPTY)}>+ Add</Btn>
      </div>
      <SortableList
        items={edu}
        onReorder={(next) => updateSection("education", next)}
        renderItem={(e) => (
          <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="text-sm font-medium text-white truncate">{e.degree}</p>
              <p className="text-xs mt-0.5" style={{ color: "#52525b" }}>{e.institution} &middot; {e.gpa}</p>
            </div>
            <div className="flex gap-2 ml-3 shrink-0">
              <Btn small variant="ghost" onClick={() => setEditing(e)}>Edit</Btn>
              <Btn small variant="danger" onClick={() => updateSection("education", edu.filter((x) => x.id !== e.id))}>Del</Btn>
            </div>
          </div>
        )}
      />
      {editing !== null && <EduForm initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </div>
  );
}