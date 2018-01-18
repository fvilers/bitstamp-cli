// If the locales argument is not provided or is undefined, the runtime's default locale is used.
const locales = undefined;
const numberOptions = { useGrouping: false };
const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const timeOptions = { hour: 'numeric', minute: '2-digit', second: '2-digit' };

export const numberToLocaleString = (value, maximumFractionDigits = 8) => parseFloat(value).toLocaleString(locales, { maximumFractionDigits, ...numberOptions });
export const dateToLocaleString = value => new Date(value).toLocaleString(locales, dateOptions);
export const timeToLocaleString = value => new Date(value).toLocaleString(locales, timeOptions);
export const dateAndTimeToLocaleString = value => new Date(value).toLocaleString(locales, { ...dateOptions, ...timeOptions });
