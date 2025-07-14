import { Button } from "@/components/ui/button";
import { Download, Pencil, Plus, Trash2Icon } from "lucide-react";
import { FacilityNewDialog } from "./facility-new-dialog";
import { useState } from "react";
import { set } from "zod";

interface Props {
    onEdit: () => void;
    onRemove: () => void;
}

export const FacilityIdHeaders = ({onRemove, onEdit}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {/* <FacilityNewDialog onOpenChange={setIsDialogOpen} open={isDialogOpen} /> */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-semibold text-white">Detail Fasilitas</h1>
          <p className="text-sm text-muted-foreground">
            Edit atau hapus fasilitas
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Button size={"sm"} variant={"glass"} onClick={onRemove}>
            <Trash2Icon className="mr-2 text-destructive" />
            Hapus
          </Button>
          <Button
            size={"sm"}
            onClick={onEdit}
            className="font-normal transition-colors duration-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Pencil />
            Edit Fasilitas
          </Button>
        </div>
      </div>
    </>
  );
};
