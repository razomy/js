import {shuffleArray} from './shuffle_array';

export function splitIntoGroups <T> (array: T[], groupsCount: number) : T[][] {
  const shuffled = shuffleArray(array);
  const groups: T[][] = Array.from({ length: groupsCount }, () => []);

  shuffled.forEach((item, index) => {
    groups[index % groupsCount].push(item);
  });

  return groups;
}


