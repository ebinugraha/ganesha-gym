import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DashboardCommand = ({ open, onOpenChange }: Props) => {
  return (
    <CommandDialog className="dark" open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Cari member, fasilitias atau check-in/out" />
      <CommandList >
        <CommandItem>test</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};
