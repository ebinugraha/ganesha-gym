import { QRScanner } from "@/components/qr-scanner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const checkInSchema = z.object({
  id: z.string().min(3, { message: "id harus diisi" }),
});

export const CheckInForm = ({ onSuccess, onCancel }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof checkInSchema>>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (values: z.infer<typeof checkInSchema>) => {
    checkIn.mutate({
      id: values.id,
    });
  };

  const checkIn = useMutation(
    trpc.checkin.checkInUser.mutationOptions({
      onSuccess: async () => {
        await queryClient
          .invalidateQueries
          // trpc.checkin.getCheckIn.queryOptions({})
          ();
        toast.success("Berhasil checkin");
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
        onCancel();
      },
    })
  );

  const handleResult = (result: string) => {
    toast.success("Scan QR berhasil")
    form.setValue("id", result, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div>
      {/* !TODO: ubah console.log menjadi ubah si field id dari form */}
      <QRScanner onResult={(result) => handleResult(result)} />
      <div className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="max-w-xs w-full mx-auto">
                <FormLabel className="text-xs text-gray-400">
                  Id Member{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    className="glass border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Masukan id user"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("id") !== "" && (
            <Button className="w-xs mx-auto mt-4" variant={"glass"}>
              Simpan
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
