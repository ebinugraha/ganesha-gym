import { DialogForm } from "@/components/dialog-form";
import { useRouter } from "next/navigation";
import { MembershipForm } from "./membership-form";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MembershipNewDialog = ({ open, onOpenChange }: Props) => {
  // const router = useRouter()

  return (
    <DialogForm
      open={open}
      onOpenChange={onOpenChange}
      title="Tambah Membership"
      description="Membership akan tampil di daftar"
    >
      <MembershipForm
        onSuccess={(id) => {
          onOpenChange(false);
        }}
        onCancel={() => {
          onOpenChange(false);
        }}
      />
    </DialogForm>
  );
};
