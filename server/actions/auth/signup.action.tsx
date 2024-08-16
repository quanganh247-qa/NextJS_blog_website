"use server";

import { SignUpType } from "@/components/shared/form-dev/schema";
import { getRoutesAuth } from "./route";

const signUpAction = async (data: SignUpType) => {
  const apiRoutes = getRoutesAuth().SIGN_UP;

  try {
    const req = await fetch(apiRoutes, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await req.json();
    return result;
  } catch (error) {
    console.error("Error in signUpAction:", error);
    return { status: "error", message: "An error occurred during sign up" };
  }
};
export default signUpAction;
