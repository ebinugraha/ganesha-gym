import { Button } from "@/components/ui/button";
import { Crown, Download } from "lucide-react";
import { useState } from "react";
import { MembershipNewDialog } from "./membership-new-dialog";
import { MembershipGetMany,  } from "../../types";

interface Props {
  data: MembershipGetMany;
}

export const MembershipHeaders = ({ data }: Props) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const exportMembershipData = () => {
    const csvData = data.items.map((item) => [
      item.id,
      item.name,
      item.description,
      item.price,
      item.active,
      item.features.color,
      item.createdAt,
      item.updatedAt,
    ]);

    const csvContent = [csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `facilities-data-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <MembershipNewDialog open={isOpenDialog} onOpenChange={setIsOpenDialog} />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-semibold text-white">
            Manajemen Membership
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola membership dan monitor penggunaan secara real-time
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Button size={"sm"} variant={"glass"} onClick={exportMembershipData}>
            <Download className="mr-2" />
            Export
          </Button>
          <Button
            size={"sm"}
            onClick={() => setIsOpenDialog((prev) => !prev)}
            className="font-normal transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Crown />
            Tambah Membership
          </Button>
        </div>
      </div>
    </>
  );
};
