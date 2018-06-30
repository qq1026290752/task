import {
    subYears,
    subMonths,
    subDays,
    differenceInYears,
    differenceInDays,
    differenceInMonths,
    isBefore,
    parse,
    format,
    isDate,
    isFuture,
    isValid
  } from 'date-fns';

export const isValidDate = (datestr: string): boolean => {
    const date = parse(datestr);
    return isDate(date) &&
           isValid(date) &&
           !isFuture(date) &&
           differenceInYears(Date.now() , date) < 150 ;
          };
