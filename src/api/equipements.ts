import api from ".";

export const getEquipements = async () => {
  const response = await api.get("/equipement");

  return response.data;
};
