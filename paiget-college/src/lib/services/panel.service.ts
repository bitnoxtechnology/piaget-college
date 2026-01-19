import API from "./axios-client";

type OverviewResponse = {
  success: boolean;
  message: string;
  data?: {
    posts: number;
    workshops: number;
    testimonials: number;
    applications: number;
  };
};

export const panelService = {
  getOverviewStats: async (): Promise<OverviewResponse> => {
    const response = await API.get("/panel");
    return response.data;
  },
};
