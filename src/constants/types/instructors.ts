export type instructor = {
  ci: string,
  nombre: string,
  apellido: string,
  nombreCompleto?: string,
  clases?: string[],
}

export type instructors = instructor[];
