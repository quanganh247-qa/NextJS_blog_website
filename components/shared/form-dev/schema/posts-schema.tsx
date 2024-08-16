import { z } from "zod";

const postSchema = z.object({
  id: z.number(),
  author: z.string().min(2, "Author must be at least 2 characters long"),
  title: z.string().min(2, "Title must be at least 2 characters long"),
  content: z.string().min(2, "Content must be at least 2 characters long"),
  created_at: z
    .string()
    .min(2, "Created at must be at least 2 characters long"),
  category: z.string().min(2, "Category must be at least 2 characters long"),
  slug: z.string().min(2, "Slug must be at least 2 characters long"),
  urlImage: z.string().url().nullable(),
});

const commentSchema = z.object({
  id: z.number(),
  post_id: z.number(),
  author: z.string().min(2, "Author must be at least 2 characters long"),
  content: z.string().min(2, "Content must be at least 2 characters long"),
});

const createCommentSchema = z.object({
  content: z.string().min(2, "Content must be at least 2 characters long"),
});

export type PostType = z.infer<typeof postSchema>;
export type CommentType = z.infer<typeof commentSchema>;
export type CreateCommentType = z.infer<typeof createCommentSchema>;
export { postSchema, commentSchema, createCommentSchema };
