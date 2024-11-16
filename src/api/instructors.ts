import api from ".";

export const getInstructor = async () => {
  const response = await api.get("/instructor");

  return response.data;
};
