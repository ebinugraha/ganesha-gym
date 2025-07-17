"use client";

import { GenerateAvatar } from "@/components/generate-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data } = authClient.useSession();

  if (!data || !data.user) {
    return <Skeleton className="h-15 w-full rounded-md" />;


    
  }

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-md border flex w-full gap-x-4 px-3 py-3 text-sm font-medium items-center justify-between overflow-hidden bg-gradient-to-r transition-colors from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30">
        {!!data?.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GenerateAvatar
            seed={data.user.name}
            variant={"shapes"}
            className="w-6 h-6"
          />
        )}
        <div className="flex flex-col gap-1 overflow-hidden flex-1 min-w-0 text-left ">
          <span className="text-xs truncate w-full">{data.user.name}</span>
          <span className="text-xs font-normal truncate w-full text-gray-300">
            {data.user.email}
          </span>
        </div>
        <ChevronDown className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm text-white">
              {data.user.name}
            </span>
            <span className="text-sm text-muted-foreground font-normal truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center justify-between cursor-pointer text-white">
          Billing
          <User className="size-4 text-blue-500" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between cursor-pointer text-white"
          onClick={onLogout}
        >
          Logout
          <LogOut className="size-4 text-red-500" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
