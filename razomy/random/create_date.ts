import {createFloat} from './create_float';

export function createDate (startYear: number = 2000, endYear: number = 2026) : string {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  const date = new Date(start + createFloat() * (end - start));

  function pad (n: number) { return n.toString().padStart(2, '0'); }
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}