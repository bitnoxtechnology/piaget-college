import API from "./axios-client";
import type {
  CreateTestimonialInput,
  UpdateTestimonialInput,
} from "../validations/testimonial-validator";

type TestimonialResponse = {
  success: boolean;
  message: string;
  data?: {
    testimonial: ITestimonial;
  };
};

type GetAllTestimonialsParams = {
  page?: number;
  limit?: number;
  isPublished?: boolean;
  q?: string;
};

type TestimonialsResponse = {
  success: boolean;
  message: string;
  data?: {
    testimonials: ITestimonial[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const testimonialService = {
  createTestimonial: async (
    payload: CreateTestimonialInput
  ): Promise<TestimonialResponse> => {
    const response = await API.post("/testimonials", payload);
    return response.data;
  },

  getAllTestimonials: async ({
    page = 1,
    limit = 10,
    isPublished,
    q,
  }: GetAllTestimonialsParams): Promise<TestimonialsResponse> => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (q) {
      params.append("q", q);
    }
    if (isPublished !== undefined) {
      params.append("published", String(isPublished));
    }
    const response = await API.get(`/testimonials?${params.toString()}`);
    return response.data;
  },

  getTestimonialById: async (
    testimonialId: string
  ): Promise<TestimonialResponse> => {
    const response = await API.get(`/testimonials/${testimonialId}`);
    return response.data;
  },

  updateTestimonial: async (
    testimonialId: string,
    payload: UpdateTestimonialInput
  ): Promise<TestimonialResponse> => {
    const response = await API.patch(`/testimonials/${testimonialId}`, payload);
    return response.data;
  },

  deleteTestimonial: async (
    testimonialId: string
  ): Promise<{ message: string }> => {
    const response = await API.delete(`/testimonials/${testimonialId}`);
    return response.data;
  },
};
