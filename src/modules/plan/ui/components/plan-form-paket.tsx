import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig, Crown } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const planSchema = z.object({
  id: z.string(),
});

interface Props {
  id?: string;
}

export const FormPlan = ({ id }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const user = authClient.useSession();

  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = (values: z.infer<typeof planSchema>) => {
    createPayment.mutate({
      membershipTypeId: values.id,
      userId: user.data?.user.id ?? "",
    });
  };

  const { data } = useQuery(trpc.membership.getMany.queryOptions({}));

  const createPayment = useMutation(
    trpc.plan.processPayments.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.plan.membershipActive.queryOptions()
        );
        toast.success("Berhasil melakukan pembayaran");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4"
                >
                  {data?.items.map((item) => (
                    <Label
                      className={`flex rounded-lg gap-y-4 glass p-4 text-white overflow-hidden`}
                      key={item.id}
                    >
                      <FormItem className="flex gap-3 w-full" key={item.id}>
                        <FormControl className="mt-3">
                          <RadioGroupItem value={item.id} className="dark " />
                        </FormControl>
                        <div className="flex flex-col gap-y-4 w-full">
                          <div className="flex flex-row items-center justify-between w-full">
                            <div className="flex gap-x-5 items-center">
                              <div
                                style={{
                                  backgroundColor: `${item.features.color}33`,
                                  borderColor: `${item.features.color}`,
                                }}
                                className="p-2 rounded-xl border-1 bg-yellow-500/20 h-10 w-10 border-yellow-500 flex item-center justify-center"
                              >
                                <Crown
                                  style={{ color: `${item.features.color}` }}
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm">{item.name}</span>
                              </div>
                            </div>
                            <div className="flex gap-x-5 items-center">
                              <Badge
                                variant={
                                  item.active ? "default" : "destructive"
                                }
                              >
                                {item.active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-gray-400 text-xs">
                            {item.description}
                          </p>
                          <div className="flex flex-col">
                            <span className="text-lg font-bold">
                              Rp {item.price}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              per bulan
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col gap-y-3">
                            <span className="text-white text-xs">
                              Benefits :
                            </span>
                            <div className="flex flex-col gap-y-1">
                              {item.features.benefits.map((benefit) => (
                                <div
                                  key={benefit}
                                  className="flex gap-x-3 items-center text-muted-foreground text-xs"
                                >
                                  <CircleCheckBig
                                    size={12}
                                    className="text-green-500"
                                  />{" "}
                                  {benefit}
                                </div>
                              ))}
                              <span className="text-muted-foreground text-xs">
                                {item.features.benefits.length - 3 > 0 &&
                                  `+ ${
                                    item.features.benefits.length - 3
                                  } lainnya`}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col gap-y-3">
                            <span>Akses fasilitas :</span>
                            <div className="flex flex-wrap gap-x-2">
                              {item.facilties.map((facilitiy, index) => (
                                <Badge
                                  key={index}
                                  variant={"outline"}
                                  className="text-white"
                                >
                                  {facilitiy.facility.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("id") && (
          <Button variant={"glass"} className="w-full" type="submit">
            Beli paket
          </Button>
        )}
      </form>
    </Form>
  );
};
