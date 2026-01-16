import {ArgumentException} from 'razomy.exceptions/argument_exception';

export class InvalidLinkException extends ArgumentException<{ link_path: string, target_path: string }> {
  constructor(public link_path: string,
              public target_path: string) {
    super('invalid targetPath', {link_path, target_path});
  }
}


