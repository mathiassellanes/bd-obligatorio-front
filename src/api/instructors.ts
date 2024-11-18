import api from ".";

export const getInstructors = async () => {
  const response = await api.get("/instructor");

  return response.data;
};

export const getInstructorByCi = async ({ ci } : { ci: string }) => {
  const response = await api.get(`/instructor/${ci}`);

  return response.data;
}

type Instructor = { ci: string, nombre: string, apellido: string };


export const createInstructor = async ({ ci, nombre, apellido }: Instructor) => {
  const response = await api.post(`/instructor`, {
    ci,
    nombre,
    apellido,
  });

  return response.data;
}

export const updateInstructor = async ({ ci, nombre, apellido }: Instructor) => {
  const response = await api.put(`/instructor/${ci}`, {
    nombre,
    apellido
  });

  return response.data;
}