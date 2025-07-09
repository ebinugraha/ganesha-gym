import { Badge, CircleCheckBig, Crown, Edit, Trash } from "lucide-react";

import { Badge as BadgeComponent } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  color: string;
  name: string;
  description: string | null;
  priority: number;
  isActive: boolean;
  price: string | number;
  benefits: string[];
  facilities: string[];
}

export const MembershipCard = ({
  color,
  name,
  description,
  priority,
  isActive,
  price,
  benefits = [],
  facilities = [],
}: Props) => {
  return (
    <div className="flex flex-col rounded-lg gap-y-4 glass p-4 text-white">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex gap-x-5 items-center">
          <div
            style={{ backgroundColor: `${color}33`, borderColor: `${color}` }}
            className="p-2 rounded-xl border-1 bg-yellow-500/20 h-10 w-10 border-yellow-500 flex item-center justify-center"
          >
            <Crown style={{ color: `${color}` }} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">{name}</span>
            <span className="text-xs text-muted-foreground">
              Priority {priority}
            </span>
          </div>
        </div>
        <div className="flex gap-x-5 items-center">
          <BadgeComponent variant={isActive ? "default" : "destructive"}>
            {isActive ? "Active" : "Inactive"}
          </BadgeComponent>
        </div>
      </div>
      <p className="text-gray-400 text-xs">{description}</p>
      <div className="flex flex-col">
        <span className="text-lg font-bold">Rp {price}</span>
        <span className="text-muted-foreground text-xs">per bulan</span>
      </div>
      <div className="flex flex-col gap-y-3">
        <span className="text-white text-xs">Benefits :</span>
        <div className="flex flex-col gap-y-1">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex gap-x-3 items-center text-muted-foreground text-xs"
            >
              <CircleCheckBig size={12} className="text-green-500" /> {benefit}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <span>Akses fasilitas :</span>
        <div className="flex flex-1 flex-wrap gap-x-2">
          {facilities.map((facilitiy) => (
            <BadgeComponent
              key={facilitiy}
              variant={"outline"}
              className="text-white"
            >
              {facilitiy}
            </BadgeComponent>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-3">
        <Button
          size={"sm"}
          variant={"glass"}
          className="font-normal text-sm w-[100px]"
        >
          <Trash className="text-destructive" />
          Delete
        </Button>
        <Button
          size={"sm"}
          variant={"glass"}
          className="font-normal text-sm w-[100px]"
        >
          <Edit className="text-yellow-500" />
          Edit
        </Button>
      </div>
    </div>
  );
};
