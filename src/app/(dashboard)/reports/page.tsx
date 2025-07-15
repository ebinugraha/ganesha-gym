// "use client";

// import { useState } from "react";
// import { QRGenerator } from "@/components/qr-generator"; 
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function GenerateQRPage() {
//   const [idAnggota, setIdAnggota] = useState("GaEb3TY6VXj3QZe8Mcig9sghJY2Q0Q8K");
//   const [inputValue, setInputValue] = useState("");

//   const handleGenerate = () => {
//     if (inputValue.trim()) {
//       setIdAnggota(inputValue);
//     }
//   };

//   return (
//     <main className="min-h-screen p-8 bg-gray-50">
//       <div className="max-w-md mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Generate QR Code Anggota</h1>
        
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="idAnggota">ID Anggota</Label>
//               <Input
//                 id="idAnggota"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 placeholder="Masukkan ID Anggota"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Contoh: GaEb3TY6VXj3QZe8Mcig9sghJY2Q0Q8K
//               </p>
//             </div>
            
//             <Button onClick={handleGenerate} className="w-full">
//               Generate QR Code
//             </Button>
//           </div>
          
//           <div className="mt-8 flex justify-center">
//             <QRGenerator value={idAnggota} size={250} />
//           </div>
          
//           <div className="mt-6 flex justify-center">
//             <Button
//               onClick={() => window.print()}
//               variant="outline"
//               className="print:hidden"
//             >
//               Cetak QR Code
//             </Button>
//           </div>
//         </div>
        
//         <div className="mt-8 text-center text-sm text-gray-500 print:hidden">
//           <p>ID Anggota akan dikodekan dalam QR code dan dapat discan menggunakan aplikasi</p>
//         </div>
//       </div>
      
//       <style jsx global>{`
//         @media print {
//           body {
//             padding: 20px;
//             background: white;
//           }
//           .print-hidden {
//             display: none;
//           }
//         }
//       `}</style>
//     </main>
//   );
// }

// "use client";

// import { useState } from "react";
// import { QRScanner } from "@/components/qr-scanner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function Home() {
//   const [scannedData, setScannedData] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     qrData: "",
//   });

//   const handleScanResult = (result: string) => {
//     setScannedData(result);
//     setFormData(prev => ({ ...prev, qrData: result }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // Lakukan aksi submit di sini (misal: API call)
//     alert(JSON.stringify(formData, null, 2));
//   };

//   return (
//     <main className="min-h-screen p-8 bg-gray-50">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">QR Code Scanner</h1>
        
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* QR Scanner Section */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
//             <QRScanner onResult={handleScanResult} />
            
//             {scannedData && (
//               <div className="mt-6 p-4 bg-green-50 rounded-md">
//                 <h3 className="font-medium">Hasil Scan:</h3>
//                 <p className="mt-1 break-all">{scannedData}</p>
//               </div>
//             )}
//           </div>

//           {/* Form Section */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Data Form</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="name">Nama</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Masukkan nama"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <Label htmlFor="qrData">Data QR</Label>
//                 <Input
//                   id="qrData"
//                   name="qrData"
//                   value={formData.qrData}
//                   onChange={handleChange}
//                   placeholder="Hasil scan akan muncul di sini"
//                   required
//                   readOnly
//                   className="bg-gray-100"
//                 />
//               </div>
              
//               <Button type="submit" className="w-full">
//                 Simpan Data
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }