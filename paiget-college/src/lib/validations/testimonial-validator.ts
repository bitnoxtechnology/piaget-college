import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  position: z.string().min(1, "Position is required"),
  content: z.string().min(30, "Content must be at least 30 characters long"),
  image: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export const updateTestimonialSchema = testimonialSchema.partial();

export type CreateTestimonialInput = z.infer<typeof testimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
