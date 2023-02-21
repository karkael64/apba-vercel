const FORMAT_DATE = 'YYYY-MM-DD';
const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss';

const mapDateFormatConvert: Record<string, (date: Date) => string> = {
  YYYY: (date) => date.getFullYear().toString().padStart(4, '0'),
  MM: (date) => (date.getMonth() + 1).toString().padStart(2, '0'),
  DD: (date) => date.getDate().toString().padStart(2, '0'),
  HH: (date) => date.getHours().toString().padStart(2, '0'),
  mm: (date) => date.getMinutes().toString().padStart(2, '0'),
  ss: (date) => date.getSeconds().toString().padStart(2, '0')
};

export const formatDateLocal = (anyDate: Date | string | number, pattern: string) => {
  const date = new Date(anyDate);
  if (Number.isNaN(date.valueOf())) {
    return '';
  }
  return Object.keys(mapDateFormatConvert).reduce(
    (acc, pair) => acc.replace(pair, () => mapDateFormatConvert[pair](date)),
    pattern
  );
};

export const dateToString = (date: Date) => formatDateLocal(date, FORMAT_DATE);
export const dateTimeToString = (date: Date) => formatDateLocal(date, FORMAT_DATETIME);

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

export const daysCountBetween = (
  before: Date | string | number | null,
  after: Date | string | number | null
): number => {
  if (!before || !after) {
    return 0;
  }
  const beforeDate = new Date(before);

  const afterDate = new Date(after);
  if (Number.isNaN(beforeDate.valueOf()) || Number.isNaN(afterDate.valueOf())) {
    return 0;
  }
  return Math.floor((afterDate.valueOf() - beforeDate.valueOf()) / 1000 / 60 / 60 / 24);
};

export const today = new Date();
