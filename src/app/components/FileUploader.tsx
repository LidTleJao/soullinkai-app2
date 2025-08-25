"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  onUpload: (f: File) => Promise<void>;
  maxSizeMB?: number; // optional: จำกัดขนาดไฟล์
};

export default function FileUploader({ onUpload, maxSizeMB = 8 }: Props) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);

    if (f) {
      // สร้าง URL preview สำหรับรูป
      const url = URL.createObjectURL(f);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const go = async () => {
    if (!file) {
      toast.warn("กรุณาเลือกไฟล์รูปภาพก่อน", { position: "top-right" });
      return;
    }

    // ตรวจชนิดไฟล์ (image/*)
    if (!file.type.startsWith("image/")) {
      toast.error("ไฟล์ต้องเป็นรูปภาพเท่านั้น", { position: "top-right" });
      return;
    }

    // ตรวจขนาดไฟล์
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`ไฟล์ใหญ่เกินไป (จำกัด ${maxSizeMB}MB)`, {
        position: "top-right",
      });
      return;
    }

    try {
      setLoading(true);
      await onUpload(file);

      // reset state
      setFile(null);
      setPreviewUrl(null);

      const input = document.getElementById(
        "file-input"
      ) as HTMLInputElement | null;
      if (input) input.value = "";

      toast.success("อัปโหลดรูปสำเร็จ ✨", {
        position: "top-right",
        autoClose: 2500,
      });
      router.push("/Personas");
    } catch (err) {
      console.error(err);
      toast.error("อัปโหลดไม่สำเร็จ ลองใหม่อีกครั้ง", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-start">
      <input
        id="file-input"
        type="file"
        className="file-input text-sm"
        accept="image/*"
        onChange={pick}
        disabled={loading}
      />
      {/* แสดง preview ถ้ามี */}
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          width={160}
          height={160}
          className="w-40 h-40 object-cover rounded border bg-white border-gray-300"
        />
      )}

      <button
        disabled={loading || !file}
        onClick={go}
        className={`btn px-3 py-1 rounded no-caret border-0 text-white ${
          loading || !file
            ? "bg-blue-500/60 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
