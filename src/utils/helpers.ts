import { format, parse, parseISO } from "date-fns";

export const formatHours = (horaInicio: string) => {
  if (horaInicio?.split(':')?.length !== 3 ) {
    return horaInicio;
  }

  return format(parse(horaInicio, 'HH:mm:ss', new Date()), 'HH:mm');
}
export const formatDate = (dia: string, formatType?: string) => format(parseISO(dia || '2021-09-05T00:00:00.000Z'), formatType || 'dd/MM/yyyy');
