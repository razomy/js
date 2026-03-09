import {shuffleArray} from './shuffle';

/**
 * Разбивает список на случайные команды
 */
export const splitIntoGroups = <T>(array: T[], groupsCount: number): T[][] => {
  const shuffled = shuffleArray(array);
  const groups: T[][] = Array.from({ length: groupsCount }, () => []);

  shuffled.forEach((item, index) => {
    groups[index % groupsCount].push(item);
  });

  return groups;
};


