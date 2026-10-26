import ms from 'ms';

export function stringToDate(string: string) {
  return ms(string as `${number}`);
}
