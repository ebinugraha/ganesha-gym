import { DialogForm } from "@/components/dialog-form";
import { FacilityForm } from "./facility-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FacilityNewDialog = ({ open, onOpenChange }: Props) => {

  return (
    <DialogForm
      open={open}
      onOpenChange={onOpenChange}
      title="Tambah Membership"
      description="Membership akan tampil di daftar"
    >
      <FacilityForm
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
      />
    </DialogForm>
  );
};
