import API from "./axios-client";
import type { ApplicationFormType } from "../validations/application-validator";

type ApplicationResponse = {
  success: boolean;
  message: string;
  data?: {
    application: IApplication;
  };
};

type GetAllApplicationsParams = {
  page?: number;
  limit?: number;
  status?: string;
  q?: string;
};

type ApplicationsResponse = {
  success: boolean;
  message: string;
  data?: {
    applications: IApplication[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type UpdateApplicationStatusInput = {
  status: "pending" | "under-review" | "accepted" | "rejected";
};

type UpdateApplicationStatusResponse = {
  success: boolean;
  message: string;
  data?: {
    application: IApplication;
  };
};

export const applicationService = {
  submitApplication: async (
    payload: ApplicationFormType
  ): Promise<ApplicationResponse> => {
    const response = await API.post("/applications/submit", payload);
    return response.data;
  },

  getAllApplications: async ({
    page = 1,
    limit = 10,
    status,
    q,
  }: GetAllApplicationsParams): Promise<ApplicationsResponse> => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (q) {
      params.append("q", q);
    }
    if (status) {
      params.append("status", status);
    }
    const response = await API.get(`/applications?${params.toString()}`);
    return response.data;
  },

  getApplicationById: async (
    applicationId: string
  ): Promise<ApplicationResponse> => {
    const response = await API.get(`/applications/${applicationId}`);
    return response.data;
  },

  updateApplicationStatus: async (
    applicationId: string,
    payload: UpdateApplicationStatusInput
  ): Promise<UpdateApplicationStatusResponse> => {
    const response = await API.patch(
      `/applications/${applicationId}/status`,
      payload
    );
    return response.data;
  },

  deleteApplication: async (
    applicationId: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await API.delete(`/applications/${applicationId}`);
    return response.data;
  },
};
