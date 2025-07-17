import { Button } from "@/components/ui/button";
import {
  Activity,
  Barcode,
  Clock,
  DoorOpen,
  Loader2,
  LogOut,
  QrCode,
  ScanBarcode,
  UserCheck,
  UserX,
  X,
  XCircle,
} from "lucide-react";
import { GetUserCheckInStatusTypes } from "../../types";
import { cn } from "../../../../lib/utils";
import { format } from "date-fns";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { CheckInDialogQr } from "./check-in-dialog-qr";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

interface Props {
  onCheckin: (open: boolean) => void;
  onCheckout?: (id: string) => void;
  values: GetUserCheckInStatusTypes;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "HH.mm");
}

export const CheckInStatusUser = ({ onCheckin, values, onCheckout }: Props) => {
  const trpc = useTRPC();

  const [isOpenDialoCheckIn, setIsOpenDialogCheckIn] = useState(false);

  const { data } = authClient.useSession();

  const status = !values ? "Belum Check-in" : "Sedang di GYM";

  const { data: statusMembership, isPending } = useQuery(
    trpc.plan.isMembershipActive.queryOptions()
  );

  return (
    <>
      <CheckInDialogQr
        open={isOpenDialoCheckIn}
        onOpenChange={setIsOpenDialogCheckIn}
        id={data?.user.id!}
        name={data?.user.name!}
        email={data?.user.email!}
      />
      <div className="flex glass flex-col gap-y-5 text-white p-5 rounded-lg">
        <div className="flex gap-x-4 items-center">
          <Activity className="text-blue-500" />
          <span className="font-bold">Status Saat Ini</span>
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <div
              className={cn(
                "w-20 h-20 flex items-center justify-center p-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500",
                !values && "bg-white/30"
              )}
            >
              {!values ? (
                <UserX className="text-white/70" />
              ) : (
                <UserCheck className="text-white" />
              )}
            </div>
            <span className="text-gray-200">{status}</span>
            <span className="text-muted-foreground text-center">
              {!values ? (
                "Lakukan check-in untuk memulai sesi latihan Anda"
              ) : (
                <span className="flex items-center gap-x-1">
                  Check-in pada {formatTime(values.checkInTime)}{" "}
                  <Clock size={15} />
                </span>
              )}
            </span>
            {!values ? (
              <Button
                className="w-full"
                variant={"green"}
                onClick={() => setIsOpenDialogCheckIn(true)}
                disabled={!statusMembership || isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : statusMembership ? (
                  <span className="flex items-center gap-x-1">
                    <QrCode />
                    CheckIn
                  </span>
                ) : (
                  <span className="flex items-center gap-x-1">
                    <XCircle /> Harap pilih membership
                  </span>
                )}
              </Button>
            ) : (
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={() => onCheckout?.(data?.user.id!)}
              >
                <LogOut />
                Checkout
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
