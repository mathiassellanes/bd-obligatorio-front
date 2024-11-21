import api from ".";

export const getStudents = async () => {
  const response = await api.get("/student");

  return response.data;
};

export const getStudentById = async ({ ci }: { ci: string }) => {
  const response = await api.get(`/student/${ci}`);

  return response.data;
}

type Student = { ci: string, nombre: string, apellido: string, telefono: string, correo: string, direccion: string, fechaNacimiento: string };


export const createStudent = async ({ ci, nombre, apellido, telefono, correo, direccion, fechaNacimiento }: Student) => {
  const response = await api.post(`/student`, {
    ci,
    nombre,
    apellido,
    telefono,
    correo,
    direccion,
    fechaNacimiento
  });

  return response.data;
}

export const updateStudent = async ({ ci, nombre, apellido, telefono, correo, direccion, fechaNacimiento }: Student) => {
  const response = await api.put(`/student/${ci}`, {
    nombre,
    apellido,
    telefono,
    correo,
    direccion,
    fechaNacimiento
  });

  return response.data;
}

export const deleteStudent = async (ci: string) => {
  const response = await api.delete(`/student/${ci}`);

  return response.data;
}
