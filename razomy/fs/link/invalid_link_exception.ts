import {ArgumentException} from 'razomy.exceptions/argument_exception';

export class InvalidLinkException extends ArgumentException<{ linkPath: string, targetPath: string }> {
  constructor(public linkPath: string,
              public targetPath: string) {
    super('invalid targetPath', {linkPath, targetPath});
  }
}


