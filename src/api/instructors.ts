import api from ".";

export const getInstructors = async () => {
  const response = await api.get("/instructor");

  return response.data;
};

export const getInstructorByCi = async ({ ci }) => {
  const response = await api.get(`/instructor/${ci}`);

  return response.data;
}
