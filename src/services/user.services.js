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

export const getAllArtistByAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/api/users/artists`);
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

export const banAccountByAdmin = async (account_id) => {
  try {
    const response = await axiosInstance.patch(
      `/api/users/banAccountByAdmin/${account_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unBanAccountByAdmin = async (account_id) => {
  try {
    const response = await axiosInstance.patch(
      `/api/users/unBanAccountByAdmin/${account_id}`
    );
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

export const updateArtistRoleByAdmin = async (user_id) => {
  try {
    const response = await axiosInstance.put(`/api/users/up-artist/${user_id}`);
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
