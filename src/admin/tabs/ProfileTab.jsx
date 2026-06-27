import { useState } from "react";
import { Field, Input, Textarea, TagInput, Btn } from "../adminShared";

export default function ProfileTab({ data, updateSection }) {
  const p = data.profile || {};
  const [form, setForm] = useState({
    name: p.name || "",
    email: p.email || "",
    phone: p.phone || "",
    location: p.location || "",
    summary: p.summary || "",
    target_titles: p.target_titles || [],
    links: { portfolio: p.links?.portfolio || "", linkedin: p.links?.linkedin || "", github: p.links?.github || "" },
  });

  const f = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const fLink = (key) => (e) => setForm((prev) => ({ ...prev, links: { ...prev.links, [key]: e.target.value } }));

  const save = () => updateSection("profile", form);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Profile</p>
        <Btn onClick={save}>Save Profile</Btn>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Field label="Full Name"><Input value={form.name} onChange={f("name")} placeholder="Sai Roshan Rao" /></Field>
        <Field label="Location"><Input value={form.location} onChange={f("location")} placeholder="Tempe, AZ" /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Field label="Email"><Input value={form.email} onChange={f("email")} placeholder="you@email.com" /></Field>
        <Field label="Phone"><Input value={form.phone} onChange={f("phone")} placeholder="555-555-5555" /></Field>
      </div>

      <Field label="Summary / Bio">
        <Textarea minRows={5} value={form.summary} onChange={f("summary")} placeholder="Brief professional summary..." />
      </Field>

      <Field label="Target Titles" hint="Comma-separated job titles shown on resume">
        <TagInput value={form.target_titles} onChange={(tags) => setForm((p) => ({ ...p, target_titles: tags }))} placeholder="Software Engineer, Backend Engineer" />
      </Field>

      <p className="text-xs font-semibold mb-3 mt-6 tracking-widest uppercase" style={{ color: "#52525b" }}>Links</p>
      <div className="space-y-3">
        <Field label="Portfolio URL"><Input value={form.links.portfolio} onChange={fLink("portfolio")} placeholder="https://yourportfolio.com" /></Field>
        <Field label="LinkedIn"><Input value={form.links.linkedin} onChange={fLink("linkedin")} placeholder="https://linkedin.com/in/..." /></Field>
        <Field label="GitHub"><Input value={form.links.github} onChange={fLink("github")} placeholder="https://github.com/..." /></Field>
      </div>
    </div>
  );
}