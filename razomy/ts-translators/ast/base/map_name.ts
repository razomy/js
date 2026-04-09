
export function mapName(name: string) {
    switch (name) {
    case 'string':
      name = 'String';
      break;
    case 'number':
      name = 'Number';
      break;
    case 'boolean':
      name = 'Boolean';
      break;
    case 'string[]':
      name = 'Array<String>';
      break;
    case 'number[]':
      name = 'Array<Number>';
      break;
    case 'boolean[]':
      name = 'Array<Boolean>';
      break;
    }

    return name;
}
