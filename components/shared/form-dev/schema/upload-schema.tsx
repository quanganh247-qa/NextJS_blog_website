import { z } from "zod";
import { zfd } from "zod-form-data";
const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
});
// Define schema for the upload post form
export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category_id: z.number(), // Adjust to the type that fits your category ID (string, number, etc.)
  // tags: z.array(tagSchema).optional(), // Tags are optional and should be an array of tag objects
  file: z.any(), // For the image file upload
});

// Export the Zod schema
export default createPostSchema;

// Export the inferred TypeScript type from the schema
export type CreatePostType = z.infer<typeof createPostSchema>;
