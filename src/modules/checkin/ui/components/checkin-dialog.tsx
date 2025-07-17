import { DialogForm } from "@/components/dialog-form";
import { CheckInForm } from "./checkin-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckInDialog = ({ open, onOpenChange }: Props) => {
  return (
    <DialogForm
      open={open}
      onOpenChange={onOpenChange}
      title="Scan QR Code"
      description="Scan QR code member untuk check-in/check-out otomatis"
    >
      <CheckInForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </DialogForm>
  );
};
