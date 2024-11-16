import api from ".";

export const getTurns = async () => {
  const response = await api.get("/turn");

  return response.data;
};
