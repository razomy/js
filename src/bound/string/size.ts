export function size(str: string): { x: number, y: number } {
  let i = 0;
  let x = 0;
  let y = 0;

  loop: while (i < str.length) {
    const char = str[i];


    switch (char) {
      case '\n':
        y++;
        x = -1;
        break;
    }
    x++;
    i++;
  }

  return {x, y};
}

export default size;
