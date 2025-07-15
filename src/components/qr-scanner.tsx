"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

interface QRScannerProps {
  onResult: (result: string) => void;
  onError?: (error: Error) => void;
}

export const QRScanner = ({ onResult, onError }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isScanning) return;

    const codeReader = new BrowserQRCodeReader();
    let active = true;

    const scan = async () => {
      try {
        if (!videoRef.current) return;

        const result = await codeReader.decodeFromVideoDevice(
          undefined, 
          videoRef.current,
          (result, error) => {
            if (result) {
              onResult(result.getText());
              setIsScanning(false);
            }
          }
        );
        
        return () => {
          active = false;
          result?.stop();
        };
      } catch (err) {
        setError("Failed to access camera");
        console.error(err);
      }
    };

    scan();

    return () => {
      active = false;
    };
  }, [isScanning, onResult, onError]);

  return (
    <div className="w-full max-w-md">
      <div className="relative aspect-square border-4 border-gray-300 rounded-lg overflow-hidden">
        {isScanning ? (
          <video ref={videoRef} className="w-full h-full object-cover" />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Kamera tidak aktif</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={`px-4 py-2 rounded-md ${
            isScanning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
        >
          {isScanning ? "Stop Scan" : "Start Scan"}
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-500 bg-red-100 p-2 rounded-md">
          Error: {error}
        </div>
      )}
    </div>
  );
};