import api from ".";

export const getClasses = async () => {
  const response = await api.get("/class");

  return response.data;
};
