import { SearchIcon, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const FiltersUsers = () => {
  return (
    <div className="w-full glass-card p-4 flex flex-col gap-y-2 items-center rounded-lg">
      <div className="w-full font-semibold text-white">Filter Member</div>
      <div className="w-full flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <Input
              type="email"
              placeholder="Cari member"
              className="glass border-white/20 text-white placeholder:text-gray-400 h-9 w-[300px] pl-8"
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="glass border-white/20 text-white h-9 px-4 flex items-center gap-x-2">
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="w-72">
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="glass border-white/20 text-white h-9 px-4 flex items-center gap-x-2">
                Paket
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="w-72">
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="glass border-white/20 text-white h-9 px-4 flex items-center gap-x-2"></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="w-72">
              <DropdownMenuItem>test</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="glass">Clear</Button>
      </div>
    </div>
  );
};
