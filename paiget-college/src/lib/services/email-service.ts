import API from "./axios-client";

type ContactUsResponse = {
  success: boolean;
  message: string;
};

export const emailService = {
  submitContactUsForm: async (payload: {
    name: string;
    email: string;
    message: string;
    phone: string;
    subject: string;
  }): Promise<ContactUsResponse> => {
    const response = await API.post("/email/contact-us", payload);
    return response.data;
  },
};
