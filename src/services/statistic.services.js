import axiosInstance from "./axiosInstance";

export const getStatisticSale = async () => {
  try {
    const response = await axiosInstance.get("/api/statistics/sales");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStatisticMonthly = async (year) => {
  try {
    const response = await axiosInstance.get(`/api/statistics/monthly/${year}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
