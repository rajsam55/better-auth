"use client";
import { jsPDF } from "jspdf";

export default function TxtToPdfConverter() {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {

      const text = event.target?.result;
      if (typeof text !== "string") return;
      const doc = new jsPDF();
      
      // splitTextToSize ensures the text wraps within the PDF page
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 10, 10);
      
      doc.save(`${file.name.replace(".txt", "")}.pdf`);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
    </div>
  );
}