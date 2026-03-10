import {createInt} from './create_int';
import {shuffleArray} from './shuffle_array';

export function createPassword (length: number = 16) : string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const all = upper + lower + numbers + specials;

  let password = '';
  // Гарантируем наличие хотя бы одного символа из каждой группы
  password += upper[createInt(0, upper.length - 1)];
  password += lower[createInt(0, lower.length - 1)];
  password += numbers[createInt(0, numbers.length - 1)];
  password += specials[createInt(0, specials.length - 1)];

  // Добиваем оставшуюся длину
  for (let i = password.length; i < length; i++) {
    password += all[createInt(0, all.length - 1)];
  }

  // Перемешиваем пароль
  return shuffleArray(password.split('')).join('');
}