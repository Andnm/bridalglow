import axiosInstance from "./axiosInstance";

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/current");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUserByAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/api/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllArtists = async () => {
  try {
    const response = await axiosInstance.get(`/api/users/artists`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (dataBody) => {
  try {
    const response = await axiosInstance.put(`/api/users`, dataBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (user_id, data) => {
  try {
    const response = await axiosInstance.put(
      `api/users/changePassword/${user_id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkOldPassword = async (user_id, data) => {
  try {
    const response = await axiosInstance.post(
      `api/users/checkOldPassword/${user_id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
