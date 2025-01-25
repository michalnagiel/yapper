import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://yapper-gchbb6e0degkhvd5.germanywestcentral-01.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getPosts = async () => {
  try {
    const response = await apiClient.get("/posts/");
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

export const getComments = async (yapId: number) => {
  try {
    const response = await apiClient.get(`/posts/${yapId}/comments/`);
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

export const postComment = async (yapId: number, content: string) => {
  try {
    const response = await apiClient.post(
      `/posts/${yapId}/comments/`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
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

export const deleteComment = async (id: number) => {
  try {
    const response = await apiClient.delete(`/comments/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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

export const addPost = async (content: string, hashtags: string[]) => {
  const payload = {
    content,
    hashtags_list: hashtags,
  };
  try {
    const response = await apiClient.post("/posts/", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
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

export const postToggleLike = async (id: number) => {
  try {
    const response = await apiClient.post(`/posts/${id}/toggle-like/`, id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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

export const commentToggleLike = async (id: number) => {
  try {
    const response = await apiClient.post(`/comments/${id}/toggle-like/`, id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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

export const deletePost = async (id: number) => {
  try {
    const response = await apiClient.delete(`/posts/${id}/`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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

export const postLogin = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/token/", {
      username: username,
      password: password,
    });
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

export const getUser = async (userId: number) => {
  try {
    const response = await apiClient.get(`/users/${userId}/`);
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

export const getUsers = async () => {
  try {
    const response = await apiClient.get(`/users/`);
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

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await apiClient.post(
      `/users/`,
      { username: username, email: email, password: password },
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
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
