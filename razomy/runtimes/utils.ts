import extractZip from 'extract-zip';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as https from 'node:https';
import path from 'node:path';
import * as tar from 'tar';
import {isWin} from "./get_exe_path";

export function execCmd(cmd: string, cwd: string, env: NodeJS.ProcessEnv, stdio: 'inherit' | 'ignore' | 'pipe' = 'inherit'): string {
    return execSync(cmd, { cwd, env, stdio, encoding: 'utf8' })?.toString() || '';
}

export async function cleanupExtractedStructure(destDir: string): Promise<void> {
    const items = await fs.promises.readdir(destDir);
    if (items.length === 1) {
        const rootItemPath = path.join(destDir, items[0]);
        const stat = await fs.promises.stat(rootItemPath);

        if (stat.isDirectory()) {
            const subItems = await fs.promises.readdir(rootItemPath);
            for (const subItem of subItems) {
                const oldPath = path.join(rootItemPath, subItem);
                const newPath = path.join(destDir, subItem);
                await fs.promises.rename(oldPath, newPath);
            }
            await fs.promises.rmdir(rootItemPath);
        }
    }
}

export function createSymlink(targetDir: string, linkPath: string) {
    if (linkExists(linkPath)) {
        fs.rmSync(linkPath, {force: true, recursive: true});
    }
    const linkType = isWin ? 'junction' : 'dir';
    fs.symlinkSync(targetDir, linkPath, linkType);
}

export function linkExists(linkPath: string): boolean {
    try {
        return fs.lstatSync(linkPath).isSymbolicLink() || fs.existsSync(linkPath);
    } catch {
        return false;
    }
}

export function downloadFile(url: string, dest: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            if ((response.statusCode === 301 || response.statusCode === 302) && response.headers.location) {
                return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download, status code: ${response.statusCode}`));
                return;
            }
            const file = fs.createWriteStream(dest);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        });
        request.on('error', (err) => {
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            reject(err);
        });
    });
}

export async function extractArchive(archivePath: string, destDir: string): Promise<void> {
    if (archivePath.endsWith('.zip')) {
        await extractZip(archivePath, {dir: destDir});
    } else if (archivePath.endsWith('.tar.gz')) {
        await tar.x({cwd: destDir, file: archivePath});
    } else {
        throw new Error(`Unsupported archive format: ${archivePath}`);
    }
}
