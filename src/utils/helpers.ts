import { format, parse } from "date-fns";

export const formatHours = (horaInicio: string) => format(parse(horaInicio || '00:00:00', 'HH:mm:ss', new Date()), 'HH:mm')
export const formatDate = (dia: string) => format(new Date(dia || '2021-09-05T00:00:00.000Z' ), 'dd/MM/yyyy');
