import API from "./axios-client";
import type { CreateWorkshopInput } from "../validations/workshop-validator";

type WorkshopResponse = {
  success: boolean;
  message: string;
  data?: {
    workshop: IWorkshop;
  };
};

type GetAllWorkshopsParams = {
  page?: number;
  limit?: number;
  isPublished?: boolean;
  q?: string;
};

type WorkshopsResponse = {
  success: boolean;
  message: string;
  data?: {
    workshops: IWorkshop[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const workshopService = {
  createWorkshop: async (
    payload: CreateWorkshopInput
  ): Promise<WorkshopResponse> => {
    const response = await API.post("/workshops", payload);
    return response.data;
  },

  getAllWorkshops: async ({
    page = 1,
    limit = 10,
    isPublished,
    q,
  }: GetAllWorkshopsParams): Promise<WorkshopsResponse> => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (q) {
      params.append("q", q);
    }
    if (isPublished !== undefined) {
      params.append("published", String(isPublished));
    }
    const response = await API.get(`/workshops?${params.toString()}`);
    return response.data;
  },

  getWorkshopById: async (workshopId: string): Promise<WorkshopResponse> => {
    const response = await API.get(`/workshops/${workshopId}`);
    return response.data;
  },

  deleteWorkshop: async (workshopId: string): Promise<{ message: string }> => {
    const response = await API.delete(`/workshops/${workshopId}`);
    return response.data;
  },
};
