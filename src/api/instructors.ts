import api from ".";

export const getInstructors = async () => {
  const response = await api.get("/instructor");

  return response.data;
};
