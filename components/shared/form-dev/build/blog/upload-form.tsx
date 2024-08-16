"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/provider/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { file } from "zod-form-data";

// Define the schema for the image upload
const creatPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type CreatePostType = z.infer<typeof creatPostSchema>;

const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<CreatePostType>({
    resolver: zodResolver(creatPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: CreatePostType) => {
    setLoading(true);

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    // Append file if present
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput?.files && fileInput.files.length > 0) {
      formData.append("file", fileInput.files[0]);
    }

    try {
      const req = await fetch("http://127.0.0.1:8000/api/post/create-post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await req.json();

      if (data.status === "success") {
        toast("Image uploaded successfully");
        form.reset();
      } else {
        toast(data.message || "Image upload failed");
      }
    } catch (error) {
      toast("An error occurred during image upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Upload Your Content
        </h2>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter title"
                  {...field}
                  className="border border-gray-300 rounded-md p-3 focus:ring focus:ring-blue-300"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Content</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter content"
                  {...field}
                  className="border border-gray-300 rounded-md p-3 focus:ring focus:ring-blue-300"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div>
          <label htmlFor="file" className="block text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="w-full text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 transition duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
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
              "Upload Image"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UploadForm;
