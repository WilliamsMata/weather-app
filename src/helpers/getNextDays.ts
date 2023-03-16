export const getNextDays = () => {
  // Obtener el día actual
  const today = new Date().getDay();

  // Array con los nombres de los días de la semana
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Array con los nombres de los próximos 7 días
  const nextDays: string[] = [];

  // Iterar por los próximos 7 días
  for (let i = 0; i < 7; i++) {
    // Obtener el índice del día de la semana sumando el índice actual y el día actual
    const indexDay = (today + i) % 7;

    // Obtener el nombre del día de la semana usando el índice
    const nameDay = days[indexDay];

    // Agregar el nombre del día al array de próximos días
    nextDays.push(nameDay);
  }

  return nextDays;
};
