import axiosInstance from "./axiosInstance";

export const createUpMembershipByPayOs = async (membership, amount) => {
  try {
    const response = await axiosInstance.post(
      `/api/payOs/create_up_membership/${membership}`,
      amount
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUpMembershipByAccountBalance = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/api/users/upMembershipByAccountBalance`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTransactionByAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/api/transactions/admin`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
