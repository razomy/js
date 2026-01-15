import * as create from 'src/create';

export function generate_guid() {
  function generate_part_8(with_hyphen?: boolean) {
    const part = (Math.random().toString(16) + '000000000').substr(2, 8);
    return with_hyphen ? '-' + part.substr(0, 4) + '-' + part.substr(4, 4) : part;
  }

  return generate_part_8() + generate_part_8(true) + generate_part_8(true) + generate_part_8();
}

export class GuidFactory implements create.With<string> {
  public create(): string {
    return generate_guid();
  }
}
