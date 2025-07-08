import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, CircleX, SearchIcon } from "lucide-react";

export const FacilitityFilters = () => {
  return (
    <div className="flex gap-x-2 items-center w-full justify-between">
      <div className="flex items-center gap-x-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Cari member"
            className="glass border-white/20 text-white placeholder:text-gray-400 h-9 pl-8"
          />
          <SearchIcon className="size-4 absolute left-2 top-1/2 text-muted-foreground -translate-y-1/2" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="rounded-md border  flex gap-x-4 px-3 py-3 text-sm font-medium items-center justify-between overflow-hidden"
          >
            <Button
              variant={"ghost"}
              className="glass font-normal border-white/20 text-white placeholder:text-gray-400 h-9 pl-8"
            >
              Status
              <ChevronDown className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="bottom" className="w-72">
            <DropdownMenuItem className="flex items-center justify-between cursor-pointer text-white">
              test
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="rounded-md border  flex gap-x-4 px-3 py-3 text-sm font-medium items-center justify-between overflow-hidden"
          >
            <Button
              variant={"ghost"}
              className="glass font-normal border-white/20 text-white placeholder:text-gray-400 h-9 pl-8"
            >
              Paket
              <ChevronDown className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="bottom" className="w-72">
            <DropdownMenuItem className="flex items-center justify-between cursor-pointer text-white">
              test
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button variant="glass">
        <CircleX />
        Clear
      </Button>
    </div>
  );
};
