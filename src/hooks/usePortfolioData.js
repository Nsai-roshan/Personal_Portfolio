import { useState, useContext } from "react";
import { PortfolioDataContext } from "../contexts/PortfolioDataContext";
import resumeData from "../data/resume.json";

const STORAGE_KEY = "portfolio_data";

export default function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);

  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return resumeData;
  });

  // Preview mode: context value overrides localStorage
  if (ctx !== null) {
    return { data: ctx, updateSection: () => {}, exportJSON: () => {}, importJSON: async () => {}, resetToDefault: () => {} };
  }

  const updateSection = (section, value) => {
    setData((prev) => {
      const next = { ...prev, [section]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "resume.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          setData(parsed);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          resolve(parsed);
        } catch (err) { reject(err); }
      };
      reader.readAsText(file);
    });

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(resumeData);
  };

  return { data, updateSection, exportJSON, importJSON, resetToDefault };
}