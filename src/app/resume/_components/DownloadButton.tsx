"use client";

import { Button } from "@/lib/ui/Button";
import { useState } from "react";

export function DownloadButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("resume-content");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const contentWidth = pdfWidth - margin * 2;
      const imgRatio = canvas.width / canvas.height;
      const scaledHeight = contentWidth / imgRatio;

      const pageContentHeight = pdfHeight - margin * 2;
      const totalPages = Math.ceil(scaledHeight / pageContentHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        const sourceY =
          (page * pageContentHeight * canvas.width) / contentWidth;
        const sourceHeight =
          (pageContentHeight * canvas.width) / contentWidth;

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.min(
          sourceHeight,
          canvas.height - sourceY
        );

        const ctx = pageCanvas.getContext("2d");
        if (!ctx) continue;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        ctx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          pageCanvas.height,
          0,
          0,
          canvas.width,
          pageCanvas.height
        );

        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
        const drawHeight =
          (pageCanvas.height / canvas.width) * contentWidth;

        pdf.addImage(
          pageImgData,
          "JPEG",
          margin,
          margin,
          contentWidth,
          drawHeight
        );
      }

      pdf.save("이승훈_이력서.pdf");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="solid"
      css={{
        colorPalette: "neutral",
        width: "fit",
        alignSelf: "center",
        px: "8",
      }}
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? "생성 중..." : "PDF 다운로드"}
    </Button>
  );
}
