import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://yapper-gchbb6e0degkhvd5.germanywestcentral-01.azurewebsites.net/api",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const getPosts = async () => {
  try {
    const response = await apiClient.get("/posts");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    } else {
      console.error("General error:", error);
    }
    throw error;
  }
};
