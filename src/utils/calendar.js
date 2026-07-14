export const generateIntershipCalendar = (startDateISO, endDateISO) => {
  if (!startDateISO) throw new Error("startDate not valid");

  if (!endDateISO) {
    throw new Error("startDate not valid");
  }

  // parsear sin reutilizar el mismo identificador 'date'
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);

  const result = [];
  let fechas = [];
  let current_date = startDate;
  let week = 0;

  const totalWeeks = calculateWeeksNumber(startDate, endDate);

  console.log("totalWeeks ", totalWeeks);

  while (current_date <= endDate) {
    let newDate = new Date(current_date);
    fechas.push(newDate);

    if (newDate.getDay() != 5) {
      if (current_date.getTime() == endDate.getTime()) {
        console.log("grabado la ultima semana");

        const currentWeek = {
          week: week + 1,
          dailyLogWeek: fechas,
        };

        result.push(currentWeek);
        fechas = [];
      }
      current_date.setDate(current_date.getDate() + 1);
    } else {
      current_date.setDate(current_date.getDate() + 3);
      week++;

      const currentWeek = {
        week: week,
        dailyLogWeek: fechas,
      };

      result.push(currentWeek);
      fechas = [];
    }
  }

  console.log("result ", result);

  return result;
};

// Obtiene la fecha del lunes de la fecha indicada
const getMonday = (date) => {
  if (date.getDay() == 1) return date;

  let monday = new Date(date);

  // Si es domingo, le resto 6.
  if (date.getDay() == 0) {
    monday.setDate(monday.getDate() - 6);
    return monday;
  } else {
    monday.setDate(monday.getDate() - (date.getDay() - 1));
    return monday;
  }
};

// Calcular el numero de semanas
// Calcula cual es el primer lunes y el ultimo lunes
// Calcula la diferencia en dias entre ambios y le suma 1 (contar primera semana)
export const calculateWeeksNumber = (startDate, endDate) => {
  const firtMonday = getMonday(startDate);
  const lastMonday = getMonday(endDate);

  // Diferencia en milsegundos entre las fecha de inicio y de fin
  let millSecondsDiff = lastMonday - firtMonday;
  const milisegundosPorDia = 1000 * 60 * 60 * 24;
  const totalDays = millSecondsDiff / milisegundosPorDia;

  return totalDays / 7 + 1;
};

// let fec1 = new Date("2026-06-08");
// let fec2 = new Date("2026-07-02");

// generateIntershipCalendar(fec1, fec2);

// console.log(calculateWeeksNumber(fec1, fec2));
