import { z } from "zod";

export const createWorkshopSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  programs: z.array(z.string()).optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(1, "Location is required"),
  instructor: z.string().optional(),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1").optional(),
  isPublished: z.boolean().optional(),
});

export type CreateWorkshopInput = z.infer<typeof createWorkshopSchema>;
