import extractZip from 'extract-zip';
import * as tar from 'tar';

export async function extractArchive(archivePath: string, destDir: string): Promise<void> {
  if (archivePath.endsWith('.zip')) {
    await extractZip(archivePath, { dir: destDir });
  } else if (archivePath.endsWith('.tar.gz')) {
    await tar.x({ cwd: destDir, file: archivePath });
  } else {
    throw new Error(`Unsupported archive format: ${archivePath}`);
  }
}
