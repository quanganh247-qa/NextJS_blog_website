"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/provider/auth-provider";
import Link from "next/link";
import React, { useEffect } from "react";
import PopoverAvt from "./popover-avt";

const AuthAvt = () => {
  const { auth } = useAuth();
  useEffect(() => {}, [auth]);
  return (
    <>
      {auth ? (
        <>
          <PopoverAvt />
        </>
      ) : (
        <div className="md:flex hidden items-center gap-2 ">
          <Button
            variant="outline"
            size="sm"
            className="text-primary border-primary"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-primary border-primary"
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthAvt;
