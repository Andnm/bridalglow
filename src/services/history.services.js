import axiosInstance from "./axiosInstance";

export const getAllHistoriesByAdmin = async () => {
  try {
    const response = await axiosInstance.get("/api/histories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllHistoriesByUser = async (user_id) => {
  try {
    const response = await axiosInstance.get(`/api/histories/users/${user_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createHistory = async (history) => {
  try {
    const response = await axiosInstance.post(`/api/histories`, history);
    return response.data;
  } catch (error) {
    throw error;
  }
};
