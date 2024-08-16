// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";

// const imageUploadSchema = z.object({
//   image: z
//     .instanceof(File)
//     .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB"),
// });

// type ImageUploadType = z.infer<typeof imageUploadSchema>;

// const ImageUpload = () => {
//   const [loading, setLoading] = useState(false);
//   const form = useForm<ImageUploadType>({
//     resolver: zodResolver(imageUploadSchema),
//     defaultValues: {
//       image: null,
//     },
//   });

//   const onSubmit = async (values: ImageUploadType) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", values.image);

//     try{
//         const res = await fetch("/api/upload", {
//             method: "POST",
//             body: formData,
//         });

//         if (res.ok) {
//             toast.success("Image uploaded successfully");
//             form.reset();
//         } else {
//             const data = await res.json();
//             toast.error(data.message || "Image upload failed");
//         }
//     }
//   };
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 min-w-[20rem] shadow-md p-5"
//       >
//         <FormField
//           control={form.control}
//           name="image"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-black text-md">Upload Image</FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => field.onChange(e.target.files[0])}
//                 />
//               </FormControl>
//               <FormMessage className="text-red-500" />
//             </FormItem>
//           )}
//         />
//         <Button
//           variant="outline"
//           size="sm"
//           className="text-primary border-primary hover:bg-primary hover:text-white"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? (
//             <svg
//               className="animate-spin h-5 w-5 mr-3 border-primary"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V2.83a1 1 0 012 0V4a8 8 0 018 8h1.17a1 1 0 010 2H20a8 8 0 01-8 8v1.17a1 1 0 010 2V20a8 8 0 01-8-8H4z"
//               ></path>
//             </svg>
//           ) : (
//             "Upload"
//           )}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default ImageUpload;
