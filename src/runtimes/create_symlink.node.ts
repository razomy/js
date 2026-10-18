import * as fs from 'node:fs';
import * as runtimesNode from '@razomy/runtimes/node';

export function createSymlink(targetDir: string, linkPath: string) {
  if (runtimesNode.linkExists(linkPath)) {
    fs.rmSync(linkPath, { force: true, recursive: true });
  }

  const linkType = runtimesNode.IS_WIN ? 'junction' : 'dir';
  fs.symlinkSync(targetDir, linkPath, linkType);
}
