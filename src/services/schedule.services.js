import axiosInstance from "./axiosInstance";

export const checkFreeSlot = async (data) => {
  try {
    const response = await axiosInstance.get("/api/schedules/free-slot", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSchedule = async (data) => {
  try {
    const response = await axiosInstance.post("/api/schedules", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
