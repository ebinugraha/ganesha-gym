"use client";

import { DialogForm } from "@/components/dialog-form";
import { useRouter } from "next/navigation";
import { MembershipForm } from "./membership-form";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export const MembershipUpdateDialog = ({ open, onOpenChange, id }: Props) => {
  const trpc = useTRPC();

  const { data, isLoading } = useQuery(
    trpc.membership.getOne.queryOptions({
      id,
    })
  );

  return (
    <>
      {!isLoading && (
        <DialogForm
          open={open}
          onOpenChange={onOpenChange}
          title="Ubah Membership"
          description="Membership akan di ubah dalam daftar"
        >
          <MembershipForm
            onSuccess={(id) => {
              onOpenChange(false);
            }}
            onCancel={() => {
              onOpenChange(false);
            }}
            initials={data}
          />
        </DialogForm>
      )}
    </>
  );
};
