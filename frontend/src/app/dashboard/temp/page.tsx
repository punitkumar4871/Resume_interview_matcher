"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

export default function FileUpload({
  label,
  endpoint,
}: {
  label: string;
  endpoint: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      console.log("Upload successful");
    } else {
      console.error("Upload failed");
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleChange}
      />
      <Button onClick={handleClick} variant="outline" className="border-dashed">
        <UploadCloud className="mr-2 h-4 w-4" />
        {label}
      </Button>
      {fileName && (
        <p className="text-sm text-muted-foreground">Uploaded: {fileName}</p>
      )}
    </div>
  );
}
