import { Badge, CircleCheckBig, Crown, Edit, Trash } from "lucide-react";

import { Badge as BadgeComponent } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MembershipGetOne } from "../../types";

interface Props {
  id: string;
  color: string;
  name: string;
  description: string | null;
  priority: number;
  isActive: boolean;
  price: string | number;
  benefits: string[];
  facilities: string[];
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const MembershipCard = ({
  color,
  id,
  name,
  description,
  priority,
  isActive,
  price,
  benefits = [],
  facilities = [],
  onRemove,
  onEdit,
}: Props) => {
  return (
    <div className="flex flex-col rounded-lg gap-y-4 glass p-4 text-white overflow-hidden">
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
      <div className="flex flex-1 flex-col gap-y-3">
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
          <span className="text-muted-foreground text-xs">
            {benefits.length - 3 > 0 && `+ ${benefits.length - 3} lainnya`}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-y-3">
        <span>Akses fasilitas :</span>
        <div className="flex flex-wrap gap-x-2">
          {facilities.map((facilitiy, index) => (
            <BadgeComponent
              key={index}
              variant={"outline"}
              className="text-white"
            >
              {facilitiy}
            </BadgeComponent>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-3">
        <div className="w-full">
          <Button
            size={"sm"}
            variant={"glass"}
            className="font-normal text-xs w-full"
            onClick={() => onEdit?.(id)}
          >
            <Edit />
            Edit
          </Button>
        </div>
        <Button
          size={"sm"}
          variant={"glass"}
          className="font-normal text-sm"
          onClick={() => onRemove?.(id)}
        >
          <Trash className="text-destructive" />
        </Button>
      </div>
    </div>
  );
};
