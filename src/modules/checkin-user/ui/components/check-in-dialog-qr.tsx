import { DialogForm } from "@/components/dialog-form";
import { QRGenerator } from "@/components/qr-generator";
import { Badge } from "@/components/ui/badge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  name: string;
  email: string;
}

export const CheckInDialogQr = ({
  open,
  onOpenChange,
  id,
  name,
}: Props) => {
  return (
    <DialogForm
      title="QR Code Anda"
      description="Tunjukan QR code ini ke petugas atau scan di mesin check-in"
      onOpenChange={onOpenChange}
      open={open}
    >
      <QRGenerator value={id} size={250} />
      <div className="flex flex-col gap-y-2 items-center justify-center w-full">
        <span>{name}</span>
        <Badge className="text-sm" variant={"default"}>{id}</Badge>
      </div>
    </DialogForm>
  );
};
