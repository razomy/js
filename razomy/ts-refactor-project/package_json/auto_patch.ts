import path from "node:path";
import fs from "node:fs";
import {execSync} from "child_process";

export function autoPatch(packageDirPath: string) {
  const jsonPath = path.join(packageDirPath, './package.json');

  // 1. Read the current version from package.json
  const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const version = pkg.version || "";

  let command = "";

  // 2. Determine which command to run
  if (version.includes('alpha')) {
    // Increments alpha (e.g., 1.0.0-alpha.0 -> 1.0.0-alpha.1)
    command = 'npm version prerelease --preid=alpha';
  } else if (version.includes('beta')) {
    // Increments beta (e.g., 1.0.0-beta.0 -> 1.0.0-beta.1)
    command = 'npm version prerelease --preid=beta';
  } else {
    // Standard patch (e.g., 1.0.0 -> 1.0.1)
    command = 'npm version patch';
  }

  // 3. Execute the command in the specific directory
  try {
    console.log(`Executing: ${command} in ${packageDirPath}`);
    execSync(command, {cwd: packageDirPath, stdio: 'inherit'});
  } catch (error:any) {
    console.error(`Failed to patch version: ${error.message}`);
  }
}
