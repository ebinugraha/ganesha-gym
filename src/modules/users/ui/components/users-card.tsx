import { GenerateAvatar } from "@/components/generate-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // CardFooter was imported but not used
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, MoreVertical, Phone } from "lucide-react";

// ---
// Interfaces
// ---
interface UserCardProps {
  image?: string;
  name: string;
  active: boolean;
  email: string;
  tipe: "VIP" | "Premium" | "Reguler"; // Define possible values for 'tipe'
  membership?: "Bulanan" | "Tahunan" | "Harian"; // Define possible values for 'membership'
  totalPertemuan?: number;
  phoneNumber?: string;
  tanggalBergabung?: string;
  lokasi?: string;
  terakhirCheckIn?: string;
}

// ---
// Helper Components (Optional but good for complex sections)
// ---

// This could be a separate file, e.g., components/user-card-detail-item.tsx
interface UserDetailItemProps {
  icon: React.ElementType; // Use React.ElementType for Lucide icons
  value?: string | number;
}

const UserDetailItem = ({ icon: Icon, value }: UserDetailItemProps) => {
  if (!value) return null; // Don't render if there's no value

  return (
    <span className="text-xs text-muted-foreground flex items-center gap-2">
      <Icon size={12} />
      {value}
    </span>
  );
};

// This could be a separate file, e.g., components/user-status-badges.tsx
interface UserStatusBadgesProps {
  active: boolean;
  membership?: UserCardProps["membership"];
}

const UserStatusBadges = ({ active, membership }: UserStatusBadgesProps) => {
  const getMembershipVariant = (memberType?: UserCardProps["membership"]) => {
    switch (memberType) {
      case "Bulanan":
        return "secondary";
      case "Tahunan":
        return "purple"; // Assuming you have a 'purple' variant defined in your badge component
      case "Harian":
        return "gray"; // Assuming you have a 'gray' variant defined
      default:
        return "default"; // Fallback
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <Badge variant={active ? "default" : "destructive"}>
        {active ? "Aktif" : "Tidak Aktif"}
      </Badge>
      {membership && ( // Only render membership badge if membership is provided
        <Badge variant={getMembershipVariant(membership)}>
          {membership}
        </Badge>
      )}
    </div>
  );
};

// ---
// Main Component
// ---
export const UserCard = ({
  image,
  name,
  active,
  email,
  tipe,
  membership,
  phoneNumber,
  tanggalBergabung,
  totalPertemuan = 0,
  lokasi,
  terakhirCheckIn,
}: UserCardProps) => {
  const getTipeColorClass = (userTipe: UserCardProps["tipe"]) => {
    switch (userTipe) {
      case "VIP":
        return "text-yellow-500";
      case "Premium":
        return "text-purple-500";
      case "Reguler":
        return "text-gray-500";
      default:
        return "text-gray-500"; // Default case for safety
    }
  };

  return (
    <Card className="flex flex-col p-4 glass-card text-white hover:border-gray-500 overflow-hidden transition-colors duration-300">
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
        <MoreVertical
          size={16}
          className="text-muted-foreground hover:text-white transition-colors duration-300"
        />
      </CardHeader>

      <CardContent className="flex flex-col gap-y-5 p-0">
        <UserStatusBadges active={active} membership={membership} />

        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between w-full">
            <UserDetailItem icon={Phone} value={phoneNumber} />
            <UserDetailItem icon={Calendar} value={tanggalBergabung} />
          </div>
          <div className="flex items-center justify-between w-full">
            <UserDetailItem icon={Clock} value={terakhirCheckIn} />
            <UserDetailItem icon={MapPin} value={lokasi} />
          </div>
        </div>

        <Separator />

        <div className="flex w-full flex-col gap-y-1">
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold">{totalPertemuan}</span>
            <span className={cn("text-lg font-semibold", getTipeColorClass(tipe))}>
              {tipe}
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