"use client ";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserLock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const roleSchema = z.object({
  role: z.string().min(1),
});

interface Props {
  role: string;
  id: string;
}

export const ChangeRoleForm = ({ role, id }: Props) => {
  const trpc = useTRPC();
  const queryCLient = useQueryClient();

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: role,
    },
  });

  const onSubmit = (values: z.infer<typeof roleSchema>) => {
    updateRole.mutate({
      id: id,
      role: values.role,
    });
  };

  const updateRole = useMutation(
    trpc.member.updateRole.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async (data) => {
        await queryCLient.invalidateQueries(
          trpc.member.getOne.queryOptions({
            id,
          })
        );
        toast.success(`Member ${data.name} berhasil di update`);
      },
    })
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-x-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex space-x-2">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {form.watch("role") !== role && (
          <Button type="submit" variant={"glass"}>
            <UserLock size={15} /> Simpan
          </Button>
        )}
      </form>
    </Form>
  );
};
