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
import { membershipCreateSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { MembershipGetOne } from "../../types";

interface Props {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initials?: MembershipGetOne;
}

export const MembershipForm = ({ onSuccess, onCancel, initials }: Props) => {
  const trpc = useTRPC();
  const queryCLient = useQueryClient();

  if (initials) {
    console.log(initials);
  }

  const form = useForm<z.infer<typeof membershipCreateSchema>>({
    resolver: zodResolver(membershipCreateSchema),
    defaultValues: {
      name: initials?.name ?? "",
      price: initials?.price.toString() ?? "",
      description: initials?.description ?? "",
      facilityAccess:
        initials?.facilties.map((facility) => facility.facility.id) ?? [],
      benefits: initials?.features.benefits[0] ?? "",
      active: initials?.active ?? true,
      colors: initials?.features.color ?? "",
    },
  });

  const facility = useQuery(trpc.facility.getMany.queryOptions({}));

  const createMembership = useMutation(
    trpc.membership.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async (data) => {
        await queryCLient.invalidateQueries(
          trpc.membership.getMany.queryOptions({})
        );
        toast.success(`Membership ${data.name} berhasil ditambahkan`);
        onSuccess?.(data.id);
      },
    })
  );

  const updateMembership = useMutation(
    trpc.membership.update.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async (data) => {
        await queryCLient.invalidateQueries(
          trpc.membership.getMany.queryOptions({})
        );
        toast.success(`Membership ${data.name} berhasil di update`);
        onSuccess?.();
      },
    })
  );

  const isEdit = !!initials;

  const onSubmit = (values: z.infer<typeof membershipCreateSchema>) => {
    if (initials) {
      updateMembership.mutate({
        ...values,
        id: initials.id,
      });
    } else {
      createMembership.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-x-4 w-full">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Nama Membership</FormLabel>
                <FormControl>
                  <Input
                    className="glass border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Contoh: VIP"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Membership</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="glass border-white/20 text-white placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Masukan desksripsi membership"
                  className="glass border-white/20 text-white placeholder:text-gray-400"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="colors"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warna label</FormLabel>
              <FormControl>
                <Input
                  type="color"
                  className="glass border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Pilih warna"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="space-y-3">
          <Label>AKses Fasilitas</Label>
          <p className="text-xs text-muted-foreground">
            Pilih fasilitas yang dapat diakses dengan membership ini
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {facility.data &&
              facility.data.items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="facilityAccess"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex items-center p-3 glass border border-white/10 rounded-lg"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <div className="flex items-center space-x-2 flex-1">
                          <div>
                            <Label className="text-white text-sm font-medium cursor-pointer">
                              {item.name}
                            </Label>
                            <p className="text-xs text-gray-400">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
          </div>
        </div>
        <FormField
          name="benefits"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefits</FormLabel>
              <FormControl>
                <Input
                  className="glass border-white/20 text-white placeholder:text-gray-400"
                  placeholder="tambah benefit"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active"
          render={(
            { field } // 'field' sekarang digunakan
          ) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value} // Gunakan field.value untuk mengontrol status
                  onCheckedChange={field.onChange} // Gunakan field.onChange untuk memperbarui state
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
              </div>
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
            Tambah
          </Button>
        </div>
      </form>
    </Form>
  );
};
