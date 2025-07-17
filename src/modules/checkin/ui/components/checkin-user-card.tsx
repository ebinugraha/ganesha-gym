import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckInToday } from "../../types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GenerateAvatar } from "@/components/generate-avatar";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";

interface Props {
  onClick: (id: string) => void;
  values: CheckInToday;
}

export const CheckInUserCard = ({ onClick, values }: Props) => {
  return (
    <Card
      onClick={() => onClick(values.userId)}
      className="flex cursor-pointer flex-col p-4 bg-white/0.1 text-white hover:border-gray-500 overflow-hidden transition-colors duration-300"
    >
      <CardHeader className="flex items-center justify-between w-full p-0">
        <div className="flex gap-x-4 items-center">
          {values.image ? (
            <Avatar>
              <AvatarImage src={values.image} />
            </Avatar>
          ) : (
            <GenerateAvatar
              seed={values.name}
              variant={"shapes"}
              className="w-6 h-6"
            />
          )}
          <div className="flex flex-col gap-1 overflow-hidden text-left">
            <span className="text-sm font-semibold truncate">
              {values.name}
            </span>
            <span className="text-xs text-muted-foreground font-normal truncate w-full">
              {values.email}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-5 p-0">
        <Button className="w-full" variant={"glass"}>
          <DoorOpen /> Check out
        </Button>
      </CardContent>
    </Card>
  );
};
