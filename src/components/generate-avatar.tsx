import { createAvatar } from "@dicebear/core";
import { initials, shapes } from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface GenerateAvatarProps {
  seed: string;
  className?: string;
  variant: "shapes" | "initials";
}

export const GenerateAvatar = ({
  seed,
  className,
  variant,
}: GenerateAvatarProps) => {
  let avatar;

  if (variant === "shapes") {
    avatar = createAvatar(shapes, {
      seed,
    });
  } else {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt={"Avatar"} />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
