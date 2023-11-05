
import { IFactory } from '../interfaces/i-factory.js';

export function generateGuid() {
  function generatePart8(withHyphen?: boolean) {
    const part = (Math.random().toString(16) + '000000000').substr(2, 8);
    return withHyphen ? '-' + part.substr(0, 4) + '-' + part.substr(4, 4) : part;
  }

  return generatePart8() + generatePart8(true) + generatePart8(true) + generatePart8();
}

export default class GuidFactory implements IFactory<string> {
  public create(): string {
    return generateGuid();
  }
}
