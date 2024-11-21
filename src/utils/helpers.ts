import { format, parse, parseISO } from "date-fns";

export const formatHours = (horaInicio: string) => {
  if (horaInicio?.split(':')?.length !== 3 ) {
    return horaInicio;
  }

  return format(parse(horaInicio, 'HH:mm:ss', new Date()), 'HH:mm');
}
export const formatDate = (dia: string, formatType?: string) => format(parseISO(dia || '2021-09-05T00:00:00.000Z'), formatType || 'dd/MM/yyyy');

export const isTurnActive = (horaInicio: string, horaFin: string, diaParaDictar: string): boolean => {
  if (!horaInicio || !horaFin || !diaParaDictar) {
    return false;
  }

  const currentDate = new Date();
  const classDate = new Date(diaParaDictar);
  const startTime = parse(horaInicio, 'HH:mm:ss', classDate);
  const endTime = parse(horaFin, 'HH:mm:ss', classDate);

  if (horaInicio > horaFin) {
    endTime.setDate(endTime.getDate() + 1);
  }

  return (
    currentDate.toDateString() === classDate.toDateString() &&
    currentDate >= startTime &&
    currentDate <= endTime
  );
};
