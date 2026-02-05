import {
  formatDate as format,
  parse,
  isToday,
  isEqual,
  isBefore,
  addMinutes,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

const useDate = () => {
  const formatDate = (
    date: Date | string,
    formatType:
      | 'dd-MM-yyyy'
      | 'yyyy-MM-dd'
      | 'yyyy-MM-dd hh:mm:ss'
      | 'yyyy-MM-dd HH:mm:ss'
      | 'MM/dd/yyyy'
      | 'dd/MM/yyyy'
      | 'dd MMM, yyyy'
      | 'dd MMM, yyyy hh:mm a'
      | 'hh:mm a'
      | 'HH:mm'
      | 'EEEE, MMMM do'
      | 'dd-MM-yyyy hh:mm:ss' = 'dd MMM, yyyy',
  ) => {
    try {
      return format(date, formatType);
    } catch {
      return format(parse(date as string, 'dd-MM-yyyy HH:mm:ss', new Date()), formatType);
    }
  };

  const isTodayDate = (date: Date | string | number) => {
    return isToday(date);
  };

  const isEqualDate = (date1: Date | string | number, date2: Date | string | number) => {
    return isEqual(date1, date2);
  };

  const isBeforeDate = (date1: Date | string | number, date2: Date | string | number) => {
    return isBefore(date1, date2);
  };

  const convertMinsToHours = (minutes: number) => {
    if (minutes < 60) return `${minutes}mins`;

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const formatted = `${hrs}hr ${mins}mins`;

    return formatted;
  };

  const toUTCString = (date: Date) => {
    return format(
      new Date(date.getTime() + date.getTimezoneOffset() * 60000),
      "yyyy-MM-dd'T'HH:mm:ss'Z'",
    );
  };

  // parse time string to date
  const parseTimeString = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date;
  };

  const convertDateToUTC = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const _date = new Date(year, month, dayOfMonth, hours, minutes, seconds);

    const offsetInMs = ((_date.getTimezoneOffset() * 60)
      * 1000);

    const utcDate = formatDate(new Date(_date.getTime() + offsetInMs), 'yyyy-MM-dd HH:mm:ss');

    return utcDate;
  };

  return {
    formatDate,
    isTodayDate,
    isEqualDate,
    isBeforeDate,
    addMinutes,
    convertMinsToHours,
    startOfMonth,
    endOfMonth,
    toUTCString,
    parseTimeString,
    convertDateToUTC
  };
};

export { useDate };
