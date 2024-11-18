import api from ".";

export const getActivities = async () => {
  const response = await api.get("/activity");

  return response.data;
};

export const getActivityById = async ({ id }) => {
  const response = await api.get(`/activity/${id}`);

  return response.data;
}
