import {ArgumentException} from 'razomy.exceptions';

export class InvalidLinkException extends ArgumentException<{ linkPath: string, targetPath: string }> {
  constructor(public linkPath: string,
              public targetPath: string) {
    super('invalid targetPath', {linkPath, targetPath});
  }
}


