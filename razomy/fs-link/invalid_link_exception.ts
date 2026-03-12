import * as exceptions from '@razomy/exceptions';

export class InvalidLinkException extends exceptions.ArgumentException<{ linkPath: string; targetPath: string }> {
  constructor(public linkPath: string, public targetPath: string) {
    super('invalid targetPath', { linkPath, targetPath });
  }
}
