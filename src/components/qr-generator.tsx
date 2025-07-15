"use client";

import { useState, useEffect, useRef } from "react";
import * as QRCode from "qrcode";

interface QRGeneratorProps {
  value: string;
  size?: number;
}

export const QRGenerator = ({ value, size = 200 }: QRGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    QRCode.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }).catch((err) => {
      setError("Gagal membuat QR code");
      console.error(err);
    });
  }, [value, size]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={size} height={size} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4 bg-gray-100 p-3 rounded-md break-all max-w-xs">
        <p className="text-sm font-medium">ID Anggota:</p>
        <p className="text-xs">{value}</p>
      </div>
    </div>
  );
};