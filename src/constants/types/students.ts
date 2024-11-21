export type Student = {
  ci: string;
  nombreCompleto: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  clases?: Class[];
};

export type Class = {
  id: string;
  actividad: Activity;
  turno: Shift;
  instructor: Instructor;
  dictada: boolean;
};

export type Activity = {
  id: string;
  descripcion: string;
  costo: number;
};

export type Shift = {
  id: string;
  horaInicio: string;
  horaFin: string;
  diaParaDictar: string;
};

export type Instructor = {
  ci: string;
  nombre: string;
  apellido: string;
};
