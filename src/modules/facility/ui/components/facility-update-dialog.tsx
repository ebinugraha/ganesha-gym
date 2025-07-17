import { DialogForm } from "@/components/dialog-form";
import { useRouter } from "next/navigation";
import { FacilityForm } from "./facility-form";
import { FacilityGetOne } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initials?: FacilityGetOne
}

export const FacilityUpdateDialog = ({ open, onOpenChange, initials }: Props) => {
  const router = useRouter();

  return (
    <DialogForm
      open={open}
      onOpenChange={onOpenChange}
      title="Ubah Fasilitas"
      description="Fasilitas akan berubah di daftar"
    >
      <FacilityForm
        onSuccess={() => {
          onOpenChange(false);
          router.push("/facilities");
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
        initials={initials}
      />
    </DialogForm>
  );
};
