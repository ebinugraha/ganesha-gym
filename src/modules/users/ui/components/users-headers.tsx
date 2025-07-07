import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const UsersHeaders = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-xl font-semibold text-white">Manajemen Member</h1>
        <p className="text-sm text-muted-foreground">
          Kelola dan pantau aktivitas member gym
        </p>
      </div>
      <Button size={"sm"} variant={"glass"}>
        <Download className="mr-2" />
        Export
      </Button>
    </div>
  );
};
