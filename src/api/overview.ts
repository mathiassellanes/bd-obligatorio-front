import api from ".";

export const getOverview = async () => {
  const response = await api.get("/overview");

  return response.data;
}
