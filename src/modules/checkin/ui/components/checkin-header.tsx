import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useState } from "react";
import { CheckInDialog } from "./checkin-dialog";

export const CheckinHeaders = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <CheckInDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-semibold text-white">
            Check-in / Check-out
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor dan kelola aktivitas member secara real-time
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            size={"sm"}
            variant={"green"}
            onClick={() => setIsDialogOpen((open) => !open)}
          >
            <QrCode className="mr-2" />
            Check-in
          </Button>
        </div>
      </div>
    </>
  );
};
