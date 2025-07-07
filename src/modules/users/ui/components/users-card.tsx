import { GenerateAvatar } from "@/components/generate-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, MoreVertical, Phone } from "lucide-react";

interface UserCardProps {
  image?: string;
  name: string;
  active: boolean;
  email: string;
  tipe: string;
  phoneNumber?: string;
  tanggalBergabung?: string;
  lokasi?: string;
  terakhirCheckIn?: string;
}

export const UserCard = ({
  image,
  name,
  active,
  email,
  tipe,
  phoneNumber,
  tanggalBergabung,
  lokasi,
  terakhirCheckIn,
}: UserCardProps) => {
  return (
    <Card className="flex flex-col p-4 glass-card text-white hover:border-gray-500 transition-colors duration-300">
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
          <div className="flex flex-col gap-1 overflow-hidden flex-1 min-w-0 text-left">
            <span className="text-sm font-semibold truncate w-full">
              {name}
            </span>
            <span className="text-xs text-muted-foreground font-normal truncate w-full">
              {email}
            </span>
          </div>
        </div>
        <MoreVertical
          size={16}
          className="text-muted-foreground hover:text-white transition-colors duration-300"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5 p-0">
        <div className="flex items-center justify-between w-full">
          <Badge>{active ? "Aktif" : "Tidak Aktif"}</Badge>
          <Badge variant={"secondary"}>{tipe}</Badge>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Phone size={12} />
              {phoneNumber}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar size={12} />
              {tanggalBergabung}
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock size={12} />
              {terakhirCheckIn}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <MapPin size={12} />
              {lokasi}
            </span>
          </div>
        </div>
        <Separator className="" />
        <div className="flex w-full flex-col gap-y-1">
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">70</span>
            <span className="text-lg text-purple-500 font-semibold">
              {tipe}
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-xs text-muted-foreground">70</span>
            <span className="text-xs text-muted-foreground">{tipe}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
