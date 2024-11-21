import api from ".";

export const getClasses = async () => {
  const response = await api.get("/class");

  return response.data;
};


export const getClass = async ({ id }: { id: string }) => {
  const response = await api.get(`/class/${id}`);

  return response.data;
};

export const createClass = async ({
  ciInstructor,
  idActividad,
  idTurno,
  diaParaDictar,
  alumnos,
}: {
  ciInstructor: string,
  idActividad: number,
  idTurno: number,
  diaParaDictar: string,
  alumnos: { ci: string, idEquipamiento: number }[],
}) => {
  const response = await api.post("/class", { ciInstructor, idActividad, idTurno, diaParaDictar, alumnos });

  return response.data;
}

export const updateClass = async ({
  id,
  ciInstructor,
  idActividad,
  idTurno,
  diaParaDictar,
  alumnos,
}: {
  id: string,
  ciInstructor: string,
  idActividad: number,
  idTurno: number,
  diaParaDictar: string,
  alumnos: { ci: string, idEquipamiento: number }[],
}) => {
  const response = await api.put(`/class/${id}`, { ciInstructor, idActividad, idTurno, diaParaDictar, alumnos });

  return response.data;
}

export const deleteClass = async (id: string) => {
  const response = await api.delete(`/class/${id}`);

  return response.data;
}
