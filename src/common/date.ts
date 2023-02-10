export const dateToString = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;

export const getYearFirstDate = (date = new Date()) => new Date(date.getFullYear(), 0, 1);
export const getMonthFirstDate = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const getWeekFirstDay = (date: Date = new Date(), isWeekStartingWithSunday = false) => {
  const weekFirstDay = new Date(date);
  if (isWeekStartingWithSunday) {
    if (weekFirstDay.getDay()) {
      weekFirstDay.setDate(weekFirstDay.getDate() - weekFirstDay.getDay());
    }
  } else {
    if (weekFirstDay.getDay() === 0) {
      weekFirstDay.setDate(weekFirstDay.getDate() - 5);
    }
    if (weekFirstDay.getDay() > 1) {
      weekFirstDay.setDate(weekFirstDay.getDate() - weekFirstDay.getDay() + 1);
    }
  }
  return weekFirstDay;
};

export const getWeek = (date: Date = new Date(), isWeekStartingWithSunday = false) => {
  const yearFirstDate = Math.floor(getYearFirstDate(date).valueOf() / 1000 / 60 / 60 / 24);
  const weekFirstDay = Math.floor(
    getWeekFirstDay(date, isWeekStartingWithSunday).valueOf() / 1000 / 60 / 60 / 24
  );
  return Math.floor((weekFirstDay - yearFirstDate) / 7);
};

export const getMonthName = (month: number) => {
  switch (month) {
    case 0:
      return 'Janvier';
    case 1:
      return 'Février';
    case 2:
      return 'Mars';
    case 3:
      return 'Avril';
    case 4:
      return 'Mai';
    case 5:
      return 'Juin';
    case 6:
      return 'Juillet';
    case 7:
      return 'Août';
    case 8:
      return 'Septembre';
    case 9:
      return 'Octobre';
    case 10:
      return 'Novembre';
  }
  return 'Décembre';
};

export const getDayName = (day: number) => {
  switch (day) {
    case 0:
      return 'Dimanche';
    case 1:
      return 'Lundi';
    case 2:
      return 'Mardi';
    case 3:
      return 'Mercredi';
    case 4:
      return 'Jeudi';
    case 5:
      return 'Vendredi';
    case 6:
      return 'Samedi';
  }
};
