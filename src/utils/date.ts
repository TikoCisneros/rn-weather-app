const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDateName = (date: string): string => DAYS[new Date(date).getUTCDay()];
