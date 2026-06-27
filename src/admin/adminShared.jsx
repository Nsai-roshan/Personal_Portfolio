import { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DragDots() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" style={{ display: "block" }}>
      <circle cx="3" cy="2.5" r="1.5"/><circle cx="7" cy="2.5" r="1.5"/>
      <circle cx="3" cy="8"   r="1.5"/><circle cx="7" cy="8"   r="1.5"/>
      <circle cx="3" cy="13.5" r="1.5"/><circle cx="7" cy="13.5" r="1.5"/>
    </svg>
  );
}

export function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="flex items-center gap-2"
    >
      <button
        {...attributes} {...listeners}
        style={{ background: "none", border: "none", color: "#3a3a3a", cursor: "grab", padding: "4px 2px", touchAction: "none", flexShrink: 0 }}
        title="Drag to reorder"
      >
        <DragDots />
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

export function SortableList({ items, onReorder, renderItem, idKey = "id" }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((i) => String(i[idKey]) === String(active.id));
    const newIdx = items.findIndex((i) => String(i[idKey]) === String(over.id));
    if (oldIdx !== -1 && newIdx !== -1) onReorder(arrayMove(items, oldIdx, newIdx));
  };
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => String(i[idKey]))} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableItem key={String(item[idKey])} id={String(item[idKey])}>
              {renderItem(item)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export function Modal({ title, onClose, children, wide }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full rounded-2xl overflow-y-auto"
        style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", maxWidth: wide ? 740 : 560, maxHeight: "90vh" }}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #1a1a1a" }}>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#52525b", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>&#x2715;</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold mb-1 tracking-wide uppercase" style={{ color: "#52525b" }}>{label}</label>
      {hint && <p className="text-xs mb-1.5" style={{ color: "#3a3a3a" }}>{hint}</p>}
      {children}
    </div>
  );
}

export const iStyle = { width: "100%", padding: "8px 12px", borderRadius: 8, fontSize: "0.82rem", background: "#111", border: "1px solid #222", color: "#e4e4e7", outline: "none", boxSizing: "border-box" };

export function Input(props) { return <input style={iStyle} {...props} />; }
export function Textarea({ minRows = 3, ...props }) {
  return <textarea style={{ ...iStyle, resize: "vertical", minHeight: minRows * 24 }} {...props} />;
}
export function AdminSelect({ children, ...props }) {
  return <select style={{ ...iStyle, cursor: "pointer" }} {...props}>{children}</select>;
}

export function Btn({ children, onClick, variant = "primary", small, type = "button", disabled }) {
  const base = { borderRadius: 8, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", border: "none", fontSize: small ? "0.72rem" : "0.82rem", padding: small ? "4px 12px" : "8px 18px", opacity: disabled ? 0.5 : 1, transition: "opacity 0.15s" };
  const v = {
    primary: { background: "#6366f1", color: "#fff" },
    ghost:   { background: "transparent", color: "#a1a1aa", border: "1px solid #222" },
    danger:  { background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" },
    success: { background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" },
  };
  return <button type={type} style={{ ...base, ...v[variant] }} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function TagInput({ value = [], onChange, placeholder }) {
  const [raw, setRaw] = useState(value.join(", "));
  const handleBlur = () => {
    const tags = raw.split(",").map((s) => s.trim()).filter(Boolean);
    onChange(tags);
    setRaw(tags.join(", "));
  };
  return (
    <input style={iStyle} value={raw} onChange={(e) => setRaw(e.target.value)} onBlur={handleBlur}
      placeholder={placeholder || "comma, separated, values"} />
  );
}