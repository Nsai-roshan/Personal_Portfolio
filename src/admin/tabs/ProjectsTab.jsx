import { useState } from "react";
import { Field, Input, Textarea, Btn, Modal, SortableList } from "../adminShared";

const EMPTY = { title: "", description: "", url: "", start_date: "", end_date: "", tech_stack: [], outcomes: [] };

function ProjectCard({ proj, onEdit, onDelete }) {
  const done = !!proj.end_date;
  return (
    <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white truncate">{proj.title}</p>
          <span className="text-xs px-1.5 py-0.5 rounded-full shrink-0" style={done ? { background: "rgba(74,222,128,0.1)", color: "#4ade80" } : { background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
            {done ? "Done" : "WIP"}
          </span>
        </div>
        <p className="text-xs mt-0.5 truncate" style={{ color: "#52525b" }}>{proj.tech_stack?.slice(0, 4).join(", ")}</p>
      </div>
      <div className="flex gap-2 ml-3 shrink-0">
        <Btn small variant="ghost" onClick={onEdit}>Edit</Btn>
        <Btn small variant="danger" onClick={onDelete}>Del</Btn>
      </div>
    </div>
  );
}

function ProjectForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    ...EMPTY, ...initial,
    tech_stack: Array.isArray(initial.tech_stack) ? initial.tech_stack.join(", ") : "",
    outcomes: Array.isArray(initial.outcomes) ? initial.outcomes.join("\n") : "",
  });
  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const submit = () => onSave({
    ...form,
    tech_stack: form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
    outcomes: form.outcomes.split("\n").map((s) => s.trim()).filter(Boolean),
  });
  return (
    <Modal title={form.id ? "Edit Project" : "Add Project"} onClose={onClose} wide>
      <Field label="Title"><Input value={form.title} onChange={f("title")} placeholder="Project name" /></Field>
      <Field label="Description"><Textarea value={form.description} onChange={f("description")} placeholder="One-line summary shown on the card" /></Field>
      <Field label="GitHub URL"><Input value={form.url} onChange={f("url")} placeholder="https://github.com/..." /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Start Date"><Input value={form.start_date} onChange={f("start_date")} placeholder="2025-01" /></Field>
        <Field label="End Date" hint="Leave blank = In Progress"><Input value={form.end_date} onChange={f("end_date")} placeholder="2025-06" /></Field>
      </div>
      <Field label="Tech Stack" hint="Comma-separated"><Input value={form.tech_stack} onChange={f("tech_stack")} placeholder="Go, React, PostgreSQL" /></Field>
      <Field label="Outcomes" hint="One bullet per line"><Textarea minRows={5} value={form.outcomes} onChange={f("outcomes")} placeholder="What did you build / achieve?" /></Field>
      <div className="flex gap-3 mt-2"><Btn onClick={submit}>Save</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

export default function ProjectsTab({ data, updateSection }) {
  const [editing, setEditing] = useState(null);
  const projects = data.projects || [];

  const save = (proj) => {
    if (proj.id) {
      updateSection("projects", projects.map((p) => (p.id === proj.id ? proj : p)));
    } else {
      updateSection("projects", [{ ...proj, id: "P" + Date.now() }, ...projects]);
    }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Projects ({projects.length})</p>
        <Btn onClick={() => setEditing(EMPTY)}>+ Add Project</Btn>
      </div>
      <SortableList
        items={projects}
        onReorder={(next) => updateSection("projects", next)}
        renderItem={(proj) => (
          <ProjectCard proj={proj} onEdit={() => setEditing(proj)} onDelete={() => updateSection("projects", projects.filter((p) => p.id !== proj.id))} />
        )}
      />
      {editing !== null && <ProjectForm initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </div>
  );
}