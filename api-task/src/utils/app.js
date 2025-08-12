import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .nonempty("Title is required"),

  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(255, "Description must be at most 255 characters")
    .nonempty("Description is required"),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(6000, "Price must be at least 6000")
    .max(60000, "Price must be at most 60000"),

  image: z
    .string()
    .url("Image must be a valid URL")
    .refine(url => url.length <= 2048, { message: "Image URL is too long" }),

  category: z
    .string()
    .nonempty("Category is required"),
});
