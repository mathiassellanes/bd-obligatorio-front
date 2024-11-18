import api from ".";

export const getEquipements = async () => {
  const response = await api.get("/equipement");

  return response.data;
};


export const getEquipementsByActiviyId = async ({ id }: { id: number }) => {
  const response = await api.get(`/equipement/activity/${id}`);

  return response.data;
};
