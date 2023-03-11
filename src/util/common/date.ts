import { modulo } from './number';

const FORMAT_DATE = 'YYYY-MM-DD';
const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss';

const mapDateFormatConvert: Record<string, (date: Date) => string> = {
  YYYY: (date) => date.getFullYear().toString().padStart(4, '0'),
  MMMM: (date) => getMonthName(date.getMonth()),
  MMM: (date) => getMonthName(date.getMonth()).substring(0, 3),
  MM: (date) => (date.getMonth() + 1).toString().padStart(2, '0'),
  M: (date) => date.getMonth().toString(),
  DD: (date) => date.getDate().toString().padStart(2, '0'),
  D: (date) => date.getDate().toString(),
  HH: (date) => date.getHours().toString().padStart(2, '0'),
  H: (date) => date.getHours().toString(),
  mm: (date) => date.getMinutes().toString().padStart(2, '0'),
  m: (date) => date.getMinutes().toString(),
  ss: (date) => date.getSeconds().toString().padStart(2, '0'),
  s: (date) => date.getSeconds().toString(),
  N: (date) => getDayName(date.getDay()),
  w: (date) => getDayName(date.getDay())
};

export const formatDateLocal = (anyDate: Date | string | number, pattern: string) => {
  const date = new Date(anyDate);
  if (Number.isNaN(date.valueOf())) {
    return '';
  }
  return (
    pattern
      .match(/(.)\1+|./g)
      ?.map((pair) => (pair in mapDateFormatConvert ? mapDateFormatConvert[pair](date) : pair))
      .join('') ?? pattern
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

const monthsName = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
] as const;

export const getMonthName = (month: number) => monthsName[modulo(month, monthsName.length)];
export const getMonthNumberByName = (month: typeof monthsName[number] & string) =>
  monthsName.indexOf(month);

const daysName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'] as const;

export const getDayName = (day: number) => daysName[modulo(day, daysName.length)];
export const getDayNumberByName = (day: typeof daysName[number] & string) => daysName.indexOf(day);

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
