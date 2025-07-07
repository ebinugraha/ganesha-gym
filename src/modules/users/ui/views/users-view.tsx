"use client";

import { InfoCard } from "@/components/info-card";
import { UsersHeaders } from "../components/users-headers";
import { SearchIcon, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCard } from "../components/users-card";
import { FiltersUsers } from "../components/users-filters";

export const UsersView = () => {
  return (
    <>
      <div className="flex-1 flex-col flex text-white pb-4 py-5 px-4 md:px-8 gap-y-4">
        {/* Users header */}
        <UsersHeaders />
        {/* Users Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard
            title="Total Member"
            value="150"
            icon={<Users className="text-blue-500" />}
          />
          <InfoCard
            title="Total Member"
            value="150"
            icon={<Users className="text-blue-500" />}
          />
          <InfoCard
            title="Total Member"
            value="150"
            icon={<Users className="text-blue-500" />}
          />
        </div>
        {/* Users Filters */}
        <FiltersUsers />
        {/* Users Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UserCard
            name="Muhamad Febrian"
            active={true}
            email="febrian.14nugraha@gmail.com"
            tipe="Bulanan"
            phoneNumber="08123456789"
            tanggalBergabung="2023-10-01"
            lokasi="Ganesha Gym"
            terakhirCheckIn="1 Hari yang lalu"
          />
          <UserCard
            name="Muhamad Febrian"
            active={true}
            email="febrian.14nugraha@gmail.com"
            tipe="Bulanan"
            phoneNumber="08123456789"
            tanggalBergabung="2023-10-01"
            lokasi="Ganesha Gym"
            terakhirCheckIn="1 Hari yang lalu"
          />
          <UserCard
            name="Muhamad Febrian"
            active={true}
            email="febrian.14nugraha@gmail.com"
            tipe="Bulanan"
            phoneNumber="08123456789"
            tanggalBergabung="2023-10-01"
            lokasi="Ganesha Gym"
            terakhirCheckIn="1 Hari yang lalu"
          />
          <UserCard
            name="Muhamad Febrian"
            active={true}
            email="febrian.14nugraha@gmail.com"
            tipe="Bulanan"
            phoneNumber="08123456789"
            tanggalBergabung="2023-10-01"
            lokasi="Ganesha Gym"
            terakhirCheckIn="1 Hari yang lalu"
          />
        </div>
      </div>
    </>
  );
};
