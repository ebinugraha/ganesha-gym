"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { Button } from "./ui/button";
import { Scan } from "lucide-react";

interface QRScannerProps {
  onResult: (result: string) => void;
  onError?: (error: Error) => void;
}

export const QRScanner = ({ onResult, onError }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 1. Simpan objek kontrol pemindaian
  const controlsRef = useRef<ReturnType<BrowserQRCodeReader['decodeFromVideoDevice']> | null>(null);

  useEffect(() => {
    if (!isScanning) return;

    const codeReader = new BrowserQRCodeReader();
    let isActive = true;

    const scan = async () => {
      try {
        if (!videoRef.current) return;

        // 2. Hentikan pemindaian sebelumnya jika ada
        if (controlsRef.current) {
          const previousControls = await controlsRef.current;
          previousControls?.stop();
        }

        // 3. Simpan promise kontrol pemindaian
        controlsRef.current = codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result) => {
            if (result && isActive) {
              onResult(result.getText());
              setIsScanning(false);
            }
          }
        );

        // 4. Tambahkan penanganan error
        controlsRef.current.catch((err) => {
          if (isActive) {
            setError("Failed to access camera");
            console.error(err);
            if (onError) onError(err);
          }
        });

      } catch (err) {
        if (isActive) {
          setError("Failed to start scanning");
          console.error(err);
          if (onError) onError(err as Error);
        }
      }
    };

    scan();

    // 5. Fungsi cleanup yang benar
    return () => {
      isActive = false;
      
      // Hentikan pemindaian saat unmount/scan dihentikan
      if (controlsRef.current) {
        controlsRef.current.then(controls => {
          controls?.stop();
          
          // Hentikan stream video
          if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
          }
        });
        controlsRef.current = null;
      }
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