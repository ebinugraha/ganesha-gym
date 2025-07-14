"use client";

//                         Cardio
//                         Strength
//                         Aquatic
//                         Group Class
//                         Functional
//                         Wellness
//                         Private
//                         Recovery

export const category: { [key: string]: string } = {
  Cardio:
    "border border-emerald-500 bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30",
  Strength:
    "border border-purple-500 bg-purple-500/20 text-purple-500 hover:bg-purple-500/30",
  Aquatic:
    "border border-blue-500 bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
  Functional:
    "border border-rose-500 bg-rose-500/20 text-rose-500 hover:bg-rose-500/30",
  Wellness:
    "border border-pink-500 bg-pink-500/20 text-pink-500 hover:bg-pink-500/30",
  Private:
    "border border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-500 hover:bg-fuchsia-500/30",
  Recovery:
    "border border-violet-500 bg-violet-500/20 text-violet-500 hover:bg-violet-500/30",
};

import { ColumnDef } from "@tanstack/react-table";
import { FacilityGetMany } from "../../types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export const columns: ColumnDef<FacilityGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Fasilitas",
    cell: ({ row }) => (
      <div className="flex gap-x-4 items-center">
        <div className="flex">
          <Image
            src={
              !!row.original.image
                ? row.original.image
                : "/placeholder_image.svg"
            }
            alt="Image placeholder"
            width={80}
            height={80}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex text-sm font-normal">{row.original.name}</div>
          <div className="flex text-xs text-muted-foreground">
            {row.original.description}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "membershipType",
    header: "TIpe membership",
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center">
        {row.original.membershipTypes.map((type) => (
          <Badge
            variant={"outline"}
            key={type.id}
            className="font-bold text-xs"
            style={{
              color: type.membershipType.features.color,
            }}
          >
            <Crown
              style={{
                color: type.membershipType.features.color,
              }}
            />
            {type.membershipType.name}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => (
      <Badge className={cn("text-white", category[row.original.category])}>
        {row.original.category}
      </Badge>
    ),
  },
];
