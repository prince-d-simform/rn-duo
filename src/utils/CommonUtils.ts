import _ from 'lodash';
import type { ErrorResponse } from '../types';

/**
 * If the argument is an array, return a new array with all the falsy values removed, otherwise return
 * the argument.
 * @param {any} o - the array to clean
 * @returns {any} - the cleaned array.
 */
function cleanArray(o: any) {
  return _.isArray(o) ? _.compact(o) : o;
}

/**
 * It recursively removes all `undefined` and `null` values from an object
 * @param {Record<string, any>} o - the object to clean
 * @returns {Record<string, any>} a new object with all the undefined or null values removed.
 */
export function cleanUndefOrNull(o: Record<string, any>) {
  return _.transform(o, (r, v, k) => {
    let isObjectBool: boolean = _.isObject(v);
    let val = isObjectBool ? cleanArray(cleanUndefOrNull(v)) : v;
    let keep = isObjectBool ? !_.isEmpty(val) : Boolean(val);

    if (keep) {
      // @ts-ignore
      r[k] = val;
    }
  });
}

/**
 * If the value is null or undefined, return true. Otherwise, return true if the string is empty or
 * contains only whitespace
 * @param {string | null} value - string | null
 * @returns A boolean value.
 */
function isNullOrWhiteSpace(value: string | null): boolean {
  if (value === null || value === 'undefined') {
    return true;
  }
  return value.toString().replace(/\s/g, '').length < 1;
}

/**
 * "Given a number and a format template, return a string that is the number formatted to the
 * template."
 *
 * The function takes two parameters:
 *
 * input: number
 * formatTemplate: string
 * The function returns a string
 * @param {number} input - The number to format
 * @param {string} formatTemplate - The format template to use.
 * @returns A string
 */
function formatNumber(input: number, formatTemplate: string): string {
  const count = formatTemplate.length;
  const stringValue = input.toString();
  if (count <= stringValue.length) {
    return stringValue;
  }
  let remainingCount = count - stringValue.length;
  remainingCount += 1; //Array must have an extra entry
  return new Array(remainingCount).join('0') + stringValue;
}

/**
 * It takes a string with placeholders in it, and replaces the placeholders with values from an object
 * @param {string} format - The string to format.
 * @param args - The arguments to be passed to the format string.
 * @param [parseByObject=false] - If the args parameter is an object, then this should be true.
 * @returns A string
 */
export function formatString(format: string, args: Record<string, any>): string {
  return format.replace(/{(\w+(:\w*)?)}/g, function (match, x) {
    //0
    const s = match.split(':');
    if (s.length > 1) {
      x = s[0].replace('{', '');
      match = s[1].replace('}', ''); //U
    }

    let arg = args[x];
    if (arg === null || arg === undefined || match.match(/{\d+}/)) {
      return arg;
    }
    if ((typeof arg === 'number' || !isNaN(arg)) && !isNaN(+match) && !isNullOrWhiteSpace(arg)) {
      return formatNumber(arg, match);
    }
    return typeof arg !== 'undefined' && arg !== null ? arg : '';
  });
}

/**
 * Formats an error response into a message object.
 * @param {ErrorResponse} errorMessage - The error response to format.
 * @returns {object} - An object with a 'message' property containing the formatted error message.
 */
export const getErrorResponse = (errorMessage: string): ErrorResponse => {
  return { message: errorMessage };
};

/**
 * Formats a date as a short header label, e.g. "Thursday 15 Oct".
 * @param {Date} [date=new Date()] - The date to format.
 * @returns {string} The formatted date label.
 */
export const formatHeaderDate = (date: Date = new Date()): string =>
  date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });

/**
 * Formats a number as a whole-dollar USD price, e.g. 420 → "$420".
 * @param {number} amount - The amount in USD.
 * @returns {string} The formatted price.
 */
export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);

/**
 * Formats a rating with one decimal place, e.g. 5 → "5.0".
 * @param {number} rating - The rating value.
 * @returns {string} The formatted rating.
 */
export const formatRating = (rating: number): string => rating.toFixed(1);

/**
 * Returns up to two uppercase initials for a display name, e.g. "Alex Morgan" → "AM".
 * @param {string} [name] - The display name.
 * @returns {string} The initials, or an empty string when no name is available.
 */
export const getInitials = (name?: string): string =>
  (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part.charAt(0).toUpperCase())
    .join('');

/**
 * Formats an ISO date range compactly, e.g. "12–17 Jun 2027" or "28 Jun–3 Jul 2027".
 * @param {string} startDate - Start date as an ISO date (YYYY-MM-DD).
 * @param {string} endDate - End date as an ISO date (YYYY-MM-DD).
 * @returns {string} The formatted date range.
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  /**
   * Formats a date in UTC with the given options.
   * @param {Date} date - The date to format.
   * @param {Intl.DateTimeFormatOptions} options - The format options.
   * @returns {string} The formatted date.
   */
  const format = (date: Date, options: Intl.DateTimeFormatOptions): string =>
    date.toLocaleDateString('en-GB', { timeZone: 'UTC', ...options });
  const endLabel = format(end, { day: 'numeric', month: 'short', year: 'numeric' });

  if (start.getUTCFullYear() !== end.getUTCFullYear()) {
    return `${format(start, { day: 'numeric', month: 'short', year: 'numeric' })}–${endLabel}`;
  }
  if (start.getUTCMonth() !== end.getUTCMonth()) {
    return `${format(start, { day: 'numeric', month: 'short' })}–${endLabel}`;
  }
  return `${start.getUTCDate()}–${endLabel}`;
};
