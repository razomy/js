const fs = require('fs');
const { exec } = require('child_process');

const packagesDirectory = '../../../'; // Replace with the path to your packages directory
const buildCommand = 'npm run build'; // Replace with the build command you want to execute

// Get a list of all subdirectories in the packages directory
const packageDirectories = fs.readdirSync(packagesDirectory, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Iterate through each package directory
packageDirectories.forEach(packageDir => {
  const packagePath = `${packagesDirectory}/${packageDir}`;
  const packageJsonPath = `${packagePath}/package.json`;

  // Check if package.json exists in the package directory
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = require(packageJsonPath);

    // Check if the build script exists in the package.json
    if (packageJson.scripts && packageJson.scripts.build) {
      console.log(`Building ${packageDir}...`);

      // Execute the build command in the package directory
      exec(buildCommand, { cwd: packagePath }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error building ${packageDir}: ${error.message}`);
        } else {
          console.log(`Build output for ${packageDir}:`);
          console.log(stdout);
          console.error(stderr);
        }
      });
    } else {
      console.log(`Skipping ${packageDir} as build script does not exist.`);
    }
  } else {
    console.log(`Skipping ${packageDir} as package.json does not exist.`);
  }
});
