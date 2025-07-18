"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchemas } from "../../types";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Loader2, TriangleAlert } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export const SignInView = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof signInSchemas>>({
    resolver: zodResolver(signInSchemas),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signInSchemas>) => {
    setIsLoading(true);
    setError(null);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          router.push("/");
        },
        onError: () => {
          setIsLoading(false);
          setError("Email atau password salah");
        },
      }
    );
  };

  const onGoogleSignIn = () => {
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
                Masuk ke akun Ganesha GYM anda
              </p>
            </div>
            {/* form */}
            <Form {...form}>
              <form
                className="flex flex-col gap-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-4">
                      <FormLabel className="text-white ">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isLoading}
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
                          type="password"
                          disabled={isLoading}
                          placeholder="••••••••"
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
                  {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
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
                onClick={onGoogleSignIn}
              >
                <FcGoogle />
                Google
              </Button>
              <p className="text-xs text-center text-white">
                Belum punya akun?{" "}
                <Link
                  className="underline underline-offset-4F"
                  href={"/sign-up"}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          {/* this section for image */}
          <div className="relative w-full overflow-hidden">
            <Image
              src="/banner-sign-in.jpg"
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
