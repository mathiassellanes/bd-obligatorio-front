import api from ".";

export const getStudents = async () => {
  const response = await api.get("/student");

  return response.data;
};
