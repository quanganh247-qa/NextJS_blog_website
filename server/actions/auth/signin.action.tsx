"use server";

import { SignInType } from "@/components/shared/form-dev/schema";
import { getRoutesAuth } from "./route";

const apiRoutes = getRoutesAuth().SIGN_IN;

const signInAction = async (data: SignInType) => {
  const apiRoutes = getRoutesAuth().SIGN_IN;

  try {
    const req = await fetch(apiRoutes, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!req.ok) {
      const errorResult = await req.json();
      return {
        status: "error",
        message: errorResult.error || "An error occurred",
      };
    }

    const result = await req.json();
    return {
      status: "success",
      user: result.user,
      token: result.token,
    };
  } catch (error) {
    console.error("Error in signInAction:", error);
    return { status: "error", message: "An error occurred during sign in" };
  }
};

export default signInAction;
