"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchemas, signUpSchemas } from "../../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export const SignUpView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchemas>>({
    resolver: zodResolver(signUpSchemas),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signUpSchemas>) => {
    setIsLoading(true);
    setError(null);
    authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          setError(null);
          router.push("/sign-in");
        },
        onError: ({ error }) => {
          setIsLoading(false);
          setError(error.message);
        },
      }
    );
  };

  const onGoogleSignUp = () => {
    setIsLoading(true);
    setError(null);
    authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setIsLoading(false);
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col text-white gap-6">
      <Card className="overflow-hidden w-full p-0">
        <CardContent className=" grid grid-cols-1 md:grid-cols-2 p-0">
          {/* this section for form */}
          <div className="flex flex-col gap-y-6 p-6">
            {/* header */}
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2 items-center">
                <Image src={"/logo.svg"} alt="logo" height={32} width={32} />
                <h1 className="font-bold text-2xl text-white">Ganesha-GYM</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Ayo bergabung menjadi bagian dari ganesha GYM
              </p>
            </div>
            {/* form */}
            <Form {...form}>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-4">
                      <FormLabel className="text-white ">
                        Nama lengkap
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="John doe"
                          className="glass border-white/20 text-white placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-4">
                      <FormLabel className="text-white ">
                        Nomor telepon
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="number"
                          placeholder="08123456789"
                          className="glass border-white/20 text-white placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-4">
                      <FormLabel className="text-white ">Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="email"
                          placeholder="ex: user123@gmail.com"
                          className="glass border-white/20 text-white placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-4">
                      <FormLabel className="text-white ">Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="password"
                          placeholder="••••••••"
                          className="glass border-white/20 text-white placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-4">
                      <FormLabel className="text-white ">
                        Konfirmasi password
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="password"
                          placeholder="Masukan ulang password"
                          className="glass border-white/20 text-white placeholder:text-gray-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />s
                    </FormItem>
                  )}
                />
                {!!error && (
                  <Alert
                    variant={"destructive"}
                    className="bg-destructive/10 border-none"
                  >
                    <TriangleAlert className="text-destructive!" />
                    <AlertTitle>{error}!</AlertTitle>
                  </Alert>
                )}
                <Button type="submit" variant={"glass"} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </Form>
            {/* liner or */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-full h-[0.2px] bg-muted-foreground" />
              <span className="text-muted-foreground mb-1s">atau</span>
              <div className="w-full h-[0.2px] bg-muted-foreground" />
            </div>
            <div className="flex flex-col gap-3">
              <Button
                className="w-full"
                variant={"outline"}
                onClick={onGoogleSignUp}
              >
                <FcGoogle />
                Google
              </Button>
              <p className="text-xs text-center text-white">
                Sudah punya akun?{" "}
                <Link
                  className="underline underline-offset-4F"
                  href={"/sign-in"}
                >
                  Sign-in
                </Link>
              </p>
            </div>
          </div>
          {/* this section for image */}
          <div className="relative w-full overflow-hidden">
            <Image
              src="/banner-sign-up.jpg"
              alt="Deskripsi Gambar"
              fill // Membuat gambar mengisi parent container
              className="object-cover" // Memastikan gambar mempertahankan rasio aspek dan dipotong
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a className="#">Term of service</a> and{" "}
        <a className="#">Privacy policy</a>.
      </div>
    </div>
  );
};
