export type turn = {
  id: number,
  horaInicio: string,
  horaFin: string,
  clases?: string[],
};

export type turns = turn[];
