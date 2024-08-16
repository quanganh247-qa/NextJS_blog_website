"use client";
import { SignIn } from "@/components/shared/authentication";
import { useAuth } from "@/provider/auth-provider";
export default function Page() {
  const { token } = useAuth();
  console.log(token);
  return (
    <>
      <SignIn />
    </>
  );
}
