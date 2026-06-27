import { useState, useRef } from "react";
import { Field, Input, Btn, Modal, SortableList } from "../adminShared";

const EMPTY = { name: "", issuer: "", date: "", url: "", image: "" };

function compressImage(file, maxSize = 400) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.src = url;
  });
}

function CertForm({ initial, onSave, onClose, token }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(initial.image || "");
  const fileRef = useRef();
  const f = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      setPreview(compressed);
      const filename = (form.id || "cert_" + Date.now()) + ".jpg";
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ imageData: compressed, filename }),
      });
      const { path } = await res.json();
      setForm((p) => ({ ...p, image: path }));
    } catch { }
    setUploading(false);
  };

  return (
    <Modal title={form.id ? "Edit Certification" : "Add Certification"} onClose={onClose}>
      <Field label="Certificate Name"><Input value={form.name} onChange={f("name")} placeholder="AWS Solutions Architect" /></Field>
      <Field label="Issuing Organization"><Input value={form.issuer} onChange={f("issuer")} placeholder="Amazon Web Services" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date"><Input value={form.date} onChange={f("date")} placeholder="2025-06" /></Field>
        <Field label="Credential URL"><Input value={form.url} onChange={f("url")} placeholder="https://..." /></Field>
      </div>
      <Field label="Badge / Image">
        <div className="flex items-center gap-3">
          {preview && <img src={preview} alt="badge" style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 8, background: "#1a1a1a" }} />}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          <Btn variant="ghost" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : preview ? "Change Image" : "Upload Image"}
          </Btn>
        </div>
      </Field>
      <div className="flex gap-3 mt-2"><Btn onClick={() => onSave(form)}>Save</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

export default function CertificationsTab({ data, updateSection, token }) {
  const [editing, setEditing] = useState(null);
  const certs = data.certifications || [];

  const save = (c) => {
    if (c.id && certs.find((x) => x.id === c.id)) {
      updateSection("certifications", certs.map((x) => (x.id === c.id ? c : x)));
    } else {
      updateSection("certifications", [{ ...c, id: "cert_" + Date.now() }, ...certs]);
    }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-semibold text-white">Certifications ({certs.length})</p>
        <Btn onClick={() => setEditing(EMPTY)}>+ Add</Btn>
      </div>
      <SortableList
        items={certs}
        onReorder={(next) => updateSection("certifications", next)}
        renderItem={(c) => (
          <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "#111", border: "1px solid #1a1a1a" }}>
            <div className="flex items-center gap-3" style={{ flex: 1, minWidth: 0 }}>
              {c.image && <img src={c.image} alt="" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 6, background: "#1a1a1a", flexShrink: 0 }} />}
              <div style={{ minWidth: 0 }}>
                <p className="text-sm font-medium text-white truncate">{c.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#52525b" }}>{c.issuer} &middot; {c.date}</p>
              </div>
            </div>
            <div className="flex gap-2 ml-3 shrink-0">
              <Btn small variant="ghost" onClick={() => setEditing(c)}>Edit</Btn>
              <Btn small variant="danger" onClick={() => updateSection("certifications", certs.filter((x) => x.id !== c.id))}>Del</Btn>
            </div>
          </div>
        )}
      />
      {editing !== null && <CertForm initial={editing} onSave={save} onClose={() => setEditing(null)} token={token} />}
    </div>
  );
}