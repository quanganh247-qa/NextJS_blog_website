"use server";
import {
  CommentType,
  CreateCommentType,
} from "@/components/shared/form-dev/schema/posts-schema";
import React from "react";
import { toast } from "sonner";

const AddCommentAction = async (
  post_id: string,
  data: CreateCommentType,
  token: string
) => {
  console.log("token", token);
  const req = await fetch(
    `http://127.0.0.1:8000/api/comment/create-comment/${post_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  //   const errorResult = await req.json();

  //   if (!req.ok) {
  //     toast(errorResult.error || "An error occurred");
  //     return;
  //   }

  const res: CommentType = await req.json();
  console.log("res", res);
  return res;
};

export default AddCommentAction;
