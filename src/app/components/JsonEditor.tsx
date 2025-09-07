"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function JsonEditor({
  initial = "",
  onSave,
}: {
  initial?: string;
  onSave: (s: string) => Promise<void>;
}) {
  const [text, setText] = useState(initial);
  const [saving, setSaving] = useState(false);

  const validateJson = (s: string) => {
    try {
      JSON.parse(s);
      return true;
    } catch {
      return false;
    }
  };

  const save = async () => {
    if (!text.trim()) {
      toast.warn("ยังไม่มีข้อมูลให้บันทึก", { position: "top-right" });
      return;
    }

    // ✅ บังคับให้เป็น JSON ที่ถูกต้องก่อนบันทึก
    if (!validateJson(text)) {
      toast.error("รูปแบบ JSON ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง", {
        position: "top-right",
      });
      return;
    }

    try {
      setSaving(true);
      await onSave(text);
      toast.success("บันทึก JSON สำเร็จ ✨", {
        position: "top-right",
        autoClose: 2200,
      });
    } catch (err) {
      console.error(err);
      toast.error("บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", {
        position: "top-right",
      });
    } finally {
      setSaving(false);
    }
  };

  const pretty = () => {
    if (!text.trim()) return;
    try {
      const prettyText = JSON.stringify(JSON.parse(text), null, 2);
      setText(prettyText);
      toast.info("จัดรูปแบบ JSON แล้ว", { position: "top-right" });
    } catch {
      toast.error("ไม่สามารถจัดรูปแบบได้: JSON ไม่ถูกต้อง", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-72 bg-white border-green-300 border-2 rounded-xl p-3 font-mono text-sm"
        placeholder='{"name":"..."}'
      />
      <div className="mt-2 flex gap-2">
        <button
          onClick={pretty}
          disabled={saving}
          className="btn btn-neutral border-0 text-white bg-gray-500 hover:bg-gray-700 px-3 py-1 rounded"
        >
          Pretty JSON
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="btn btn-neutral border-0 text-white bg-green-300 hover:bg-green-500 px-3 py-1 rounded"
        >
          {saving ? "Saving..." : "Save JSON"}
        </button>
      </div>
    </div>
  );
}
