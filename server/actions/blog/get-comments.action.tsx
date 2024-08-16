import { CommentType } from "@/components/shared/form-dev/schema/posts-schema";
import React from "react";
import { toast } from "sonner";

const getCommentsAction = async (post_id: string) => {
  const token = localStorage.getItem("token");
  try {
    const req = await fetch(
      `http://127.0.0.1:8000/api/comment/get-all-comments/${post_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!req.ok) {
      const errorResult = await req.json();
      toast(errorResult.error || "An error occurred");
      return;
    }

    const data: CommentType[] = await req.json();
    return data;
  } catch (err) {
    toast("Failed to load post");
  }
};

export default getCommentsAction;
