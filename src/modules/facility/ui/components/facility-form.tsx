"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { FacilityGetOne } from "../../types";
import { createFasilitySchema } from "../../schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Props {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initials?: FacilityGetOne;
}

export const FacilityForm = ({ onSuccess, onCancel, initials }: Props) => {
  const trpc = useTRPC();
  const queryCLient = useQueryClient();

  const form = useForm<z.infer<typeof createFasilitySchema>>({
    resolver: zodResolver(createFasilitySchema),
    defaultValues: {
      name: initials?.name ?? "",
      description: initials?.description ?? "",
      category: initials?.category ?? "",
      image: initials?.image ?? "",
    },
  });

  const createFacility = useMutation(
    trpc.facility.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async (data) => {
        await queryCLient.invalidateQueries(
          trpc.facility.getMany.queryOptions({})
        );
        toast.success(`Fasilitas ${data.name} berhasil ditambahkan`);
        onSuccess?.(data.id);
      },
    })
  );

  const updateFacility = useMutation(
    trpc.facility.update.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async (data) => {
        await queryCLient.invalidateQueries(
          trpc.facility.getMany.queryOptions({})
        );
        toast.success(`Facility ${data.name} berhasil di update`);
        onSuccess?.();
      },
    })
  );

  const isEdit = !!initials;

  const onSubmit = (values: z.infer<typeof createFasilitySchema>) => {
    if (initials) {
      updateFacility.mutate({
        ...values,
        id: initials.id,
      });
    } else {
      createFacility.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Nama Fasilitas</FormLabel>
              <FormControl>
                <Input
                  className="glass border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Contoh: Dumble"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukan desksripsi fasilitas"
                  className="glass border-white/20 text-white placeholder:text-gray-400"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih kategori untuk fasilitas ini" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="">
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Strength">Strength</SelectItem>
                  <SelectItem value="Aquatic">Aquatic</SelectItem>
                  <SelectItem value="Functional">Functional</SelectItem>
                  <SelectItem value="Wellness">Wellness</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Recovery">Recovery</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Masukan link url image</FormLabel>
              <FormControl>
                <Input
                  className="glass border-white/20 text-white placeholder:text-gray-400"
                  placeholder="tambah gambar"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          {onCancel && (
            <Button variant={"outline"} onClick={onCancel} type="button">
              cancel
            </Button>
          )}
          <Button type="submit" variant={"glass"}>
            {isEdit ? "Update" : "Tambah"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
