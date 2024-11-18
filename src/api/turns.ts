import api from ".";
import { formatHours } from "../utils/helpers";

export const getTurns = async () => {
  const response = await api.get("/turn");

  return response.data;
};

export const getTurnsById = async ({ id }) => {
  const response = await api.get(`/turn/${id}`);

  return response.data;
};

export const createTurn = async ({ horaInicio, horaFin }) => {
  const response = await api.post(`/turn`, {
    horaInicio: formatHours(horaInicio),
    horaFin: formatHours(horaFin)
  });

  return response.data;
}

export const updateTurn = async ({ id, horaInicio, horaFin }) => {
  console.log(horaInicio, horaFin);

  const response = await api.put(`/turn/${id}`, {
    horaInicio: formatHours(horaInicio),
    horaFin: formatHours(horaFin)
  });

  return response.data;
}
