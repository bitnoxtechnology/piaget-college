import { z } from "zod";

export const applicationSchema = z
  .object({
    paymentReferenceCode: z
      .string()
      .min(1, "Payment reference code is required")
      .min(5, "Payment reference code must be at least 5 characters long"),
    surname: z
      .string()
      .min(2, "Surname must be at least 2 characters long")
      .regex(
        /^[a-zA-Z\s-]+$/,
        "Surname can only contain letters, hyphens, and spaces"
      ),
    firstname: z
      .string()
      .min(2, "First name must be at least 2 characters long")
      .regex(
        /^[a-zA-Z\s-]+$/,
        "First name can only contain letters, hyphens, and spaces"
      ),
    dateOfBirth: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date of birth",
      })
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age >= 16;
      }, "You must be at least 16 years old"),
    gender: z.enum(["Male", "Female", "Other"], {
      message: "Please select a valid gender",
    }),
    nationality: z
      .string()
      .min(2, "Nationality must be at least 2 characters long"),
    highestEducationLevel: z.enum(
      ["WAEC/NECO", "JAMB", "Diploma", "Bachelor's Degree", "Higher"],
      {
        message: "Please select a valid education level",
      }
    ),
    courseOfInterest: z
      .string()
      .min(2, "Course of interest must be at least 2 characters long"),
    program: z.enum(["Undergraduate", "Professional Diploma in Education"], {
      message: "Please select a valid program",
    }),
    jambScore: z.string().min(1, "JAMB score/credit/passes is required"),
    waecSubjects: z
      .string()
      .min(1, "WAEC/NECO subjects are required")
      .min(5, "Please provide complete subject information"),
    intendedStartDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid start date",
      })
      .refine((date) => {
        return new Date(date) > new Date();
      }, "Start date must be in the future"),
    personalMessage: z
      .string()
      .max(500, "Personal message must be at most 500 characters long")
      .optional()
      .default(""),
    email: z
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits long")
      .regex(
        /^[\d\s\-+()]+$/,
        "Phone number can only contain digits, spaces, hyphens, plus, and parentheses"
      ),
    sourceOfInformation: z.enum(
      [
        "School Website",
        "Social Media",
        "Friend/Referral",
        "Advertisement",
        "Other",
      ],
      {
        message: "Please select where you heard about us",
      }
    ),
    otherSourceDetails: z.string().optional().default(""),
  })
  .refine(
    (data) => {
      if (data.sourceOfInformation === "Other" && !data.otherSourceDetails) {
        return false;
      }
      return true;
    },
    {
      message: "Please provide details about other source",
      path: ["otherSourceDetails"],
    }
  );

export type ApplicationFormType = z.infer<typeof applicationSchema>;
