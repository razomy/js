import * as create from 'src/create';

export default function generate_guid() {
  function generatePart8(withHyphen?: boolean) {
    const part = (Math.random().toString(16) + '000000000').substr(2, 8);
    return withHyphen ? '-' + part.substr(0, 4) + '-' + part.substr(4, 4) : part;
  }

  return generatePart8() + generatePart8(true) + generatePart8(true) + generatePart8();
}

export class GuidFactory implements create.With<string> {
  public create(): string {
    return generate_guid();
  }
}
