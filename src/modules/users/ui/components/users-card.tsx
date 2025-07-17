import { GenerateAvatar } from "@/components/generate-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // CardFooter was imported but not used
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar, Clock, UserLock } from "lucide-react";

// ---
// Interfaces
// ---
interface UserCardProps {
  id: string;
  image?: string;
  name: string;
  active: boolean;
  email: string;
  tipe?: string; // Define possible values for 'tipe'
  membership?: number; // Define possible values for 'membership'
  totalPertemuan?: number;
  phoneNumber?: string;
  tanggalBergabung?: string;
  lokasi?: string;
  terakhirCheckIn?: string;
  role?: string;
  onClick: (id: string) => void;
  colorTipe?: string;
}

export const UserCard = ({
  id,
  image,
  name,
  active,
  email,
  tipe,
  role,
  colorTipe,
  tanggalBergabung,
  onClick,
  totalPertemuan = 0,
  terakhirCheckIn,
}: UserCardProps) => {
  return (
    <Card
      onClick={() => onClick(id)}
      className="flex cursor-pointer flex-col p-4 glass-card text-white hover:border-gray-500 overflow-hidden transition-colors duration-300"
    >
      <CardHeader className="flex items-center justify-between w-full p-0">
        <div className="flex gap-x-4 items-center">
          {image ? (
            <Avatar>
              <AvatarImage src={image} />
            </Avatar>
          ) : (
            <GenerateAvatar
              seed={name}
              variant={"shapes"}
              className="w-6 h-6"
            />
          )}
          <div className="flex flex-col gap-1 overflow-hidden text-left">
            <span className="text-sm font-semibold truncate">{name}</span>
            <span className="text-xs text-muted-foreground font-normal truncate w-full">
              {email}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-5 p-0">
        <Badge variant={active ? "default" : "destructive"}>
          {active ? "Aktif" : "Tidak Aktif"}
        </Badge>

        <div className="flex flex-col gap-y-2">
          <span className="flex items-center gap-x-2 text-sm text-gray-400">
            <Clock size={15} /> Terakhir checkin : {terakhirCheckIn}
          </span>
          <span className="flex items-center gap-x-2 text-sm text-gray-400">
            <Calendar size={15} /> Tanggal bergabung : {tanggalBergabung}
          </span>
          <span className="flex items-center gap-x-2 text-sm text-gray-400">
            <UserLock size={15} /> Role : {role}
          </span>
        </div>

        <Separator />

        <div className="flex w-full flex-col gap-y-1">
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">{totalPertemuan}</span>

            <span
              className={cn("text-lg font-semibold")}
              style={{ color: colorTipe }}
            >
              {!tipe ? "Belum aktif" : tipe}
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-muted-foreground">Pertemuan</span>
            <span className="text-xs text-muted-foreground">Paket</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
