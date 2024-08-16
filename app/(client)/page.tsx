// "use client";
import Introsection from "@/components/shared/section/intro-section";
import { Blogsection, Description } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/provider/auth-provider";

export default function Home() {
  // const { token, auth } = useAuth();
  // console.log(token, auth);
  return (
    <>
      <Introsection />
      <Description />
    </>
  );
}
