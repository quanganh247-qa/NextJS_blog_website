"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { SignUpType, SignInType } from "../../schema";
import { signUpSchema, signInSchema } from "../../schema";
import Link from "next/link";
import signInAction from "@/server/actions/auth/signin.action";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useAuth } from "@/provider/auth-provider";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);

  // This is a custom hook that returns the user's token
  const { auth, setAuth } = useAuth();

  const router = useRouter();

  if (auth) {
    router.push("/");
  }

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInType) => {
    setLoading(true);
    const data = await signInAction(values);

    if (data.status === "success") {
      toast.success("Sign in successful");
      localStorage.setItem("token", data.token);
      setAuth(true);
      form.reset();
    } else {
      toast.error(data.message || "Sign in failed");
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 min-w-[20rem] shadow-md p-5 "
      >
        <div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-md">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} type="username" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-md">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="text-primary border-primary hover:bg-primary hover:text-white"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 border-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V2.83a1 1 0 012 0V4a8 8 0 018 8h1.17a1 1 0 010 2H20a8 8 0 01-8 8v1.17a1 1 0 010 2V20a8 8 0 01-8-8H4z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
