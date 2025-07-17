"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { Button } from "./ui/button";
import { Scan } from "lucide-react";
import { toast } from "sonner";

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
    <div className="max-w-xs mx-auto flex flex-col items-center justify-center">
      <div className="aspect-square w-full h-full rounded-md overflow-hidden">
        {isScanning ? (
          <video
            ref={videoRef}
            className="w-full h-full rounded-md object-cover"
          />
        ) : (
          <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
            <p className="text-gray-500">Kamera tidak aktif</p>
          </div>
        )}
      </div>

      <Button
        onClick={() => setIsScanning(!isScanning)}
        variant={"green"}
        className="w-full mt-4"
      >
        <Scan />
        {isScanning ? "Stop Scan QR" : "Mulai scan QR"}
      </Button>

      {error && (
        <div className="mt-4 text-red-500 bg-red-100 p-2 rounded-md">
          Error: {error}
        </div>
      )}
    </div>
  );
};
