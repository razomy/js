import * as fs from 'node:fs';
import path from 'node:path';
import * as run from '@razomy/run/node';
import * as runtimes from '@razomy/runtimes/node';

function getContext(versionRuntimeDir: string) {
  const binSubDir = runtimes.IS_MAC ? 'Contents/Home/bin' : 'bin';
  const binPath = path.join(versionRuntimeDir, binSubDir);

  const javacExe = runtimes.getExePath(versionRuntimeDir, `${binSubDir}/javac`, 'bin/javac.exe');
  const javaExe = runtimes.getExePath(versionRuntimeDir, `${binSubDir}/java`, 'bin/java.exe');
  const nativeImgExe = runtimes.getExePath(versionRuntimeDir, `${binSubDir}/native-image`, 'bin/native-image.cmd');

  const env = {
    ...process.env,
    JAVA_HOME: versionRuntimeDir,
    PATH: `${binPath}${path.delimiter}${process.env.PATH}`,
  };
  return { javaExe, javacExe, nativeImgExe, env };
}

export const JAVA_RUNTIME: runtimes.RuntimeProvider = {
  defaultVersion: '25',

  setup(versionWorkspaceDir, versionRuntimeDir) {
    const { javacExe, nativeImgExe, env } = getContext(versionRuntimeDir);
    const javaPath = path.join(versionWorkspaceDir, 'StartCli.java');
    const javaCode = `import razomy.run.Cli;\n\npublic class StartCli {\n    public static void main(String[] args) {\n        Cli.start(args);\n    }\n}`;
    fs.writeFileSync(javaPath, javaCode);

    console.log('Compiling Java...');
    runtimes.execCmd(`${javacExe} StartCli.java`, versionWorkspaceDir, env);

    try {
      runtimes.execCmd(`${nativeImgExe} StartCli`, versionWorkspaceDir, env);
    } catch {
      console.warn('Native binary skipped. Using bytecode.');
    }
  },

  run(versionWorkspaceDir, versionRuntimeDir, packageName, functionName, params) {
    const { javaExe, env } = getContext(versionRuntimeDir);
    const cmd =
      fs.existsSync(path.join(versionWorkspaceDir, 'StartCli.exe')) ||
      fs.existsSync(path.join(versionWorkspaceDir, 'StartCli'))
        ? `./StartCli`
        : `${javaExe.replace(/"/g, '')} StartCli`;

    return run.cli.spawnProcess(cmd, [packageName, functionName, params], versionWorkspaceDir, env);
  },

  async install(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { env } = getContext(versionRuntimeDir);
    let mvnCmd = 'mvn';

    try {
      runtimes.execCmd(`${runtimes.IS_WIN ? 'where' : 'which'} mvn`, versionWorkspaceDir, env, 'ignore');
    } catch {
      const mavenDir = path.join(versionRuntimeDir, 'maven');
      mvnCmd = path.join(mavenDir, 'apache-maven-3.9.6', 'bin', runtimes.IS_WIN ? 'mvn.cmd' : 'mvn');

      if (!fs.existsSync(mvnCmd)) {
        console.log('⏳ Apache Maven not found. Downloading standalone wrapper...');
        const mvnZipUrl = 'https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip';
        const zipDest = path.join(versionRuntimeDir, 'maven.zip');

        await runtimes.downloadFile(mvnZipUrl, zipDest);
        await runtimes.extractArchive(zipDest, mavenDir);
        fs.unlinkSync(zipDest);

        if (!runtimes.IS_WIN) runtimes.execCmd(`chmod +x "${mvnCmd}"`, versionWorkspaceDir, env);
      }
      mvnCmd = `"${mvnCmd}"`;
    }

    runtimes.execCmd(
      `${mvnCmd} dependency:get -Dartifact=${packageName} -Ddest=${versionWorkspaceDir}`,
      versionWorkspaceDir,
      env,
    );
  },

  remove(packageName: string, versionWorkspaceDir: string) {
    const files = fs.readdirSync(versionWorkspaceDir);
    const jarFile = files.find((f) => f.includes(packageName) && f.endsWith('.jar'));
    if (jarFile) fs.unlinkSync(path.join(versionWorkspaceDir, jarFile));
    else console.warn(`⚠️ Java package ${packageName} not found.`);
  },

  list(versionWorkspaceDir: string): string[] {
    try {
      if (!fs.existsSync(versionWorkspaceDir)) return [];
      return fs.readdirSync(versionWorkspaceDir).filter((f) => f.endsWith('.jar'));
    } catch {
      return [];
    }
  },

  async getDownloadInfo(version: string, platform: string, arch: string) {
    const osName = platform === 'win32' ? 'windows' : platform === 'darwin' ? 'macos' : 'linux';
    const javaArch = arch === 'arm64' ? 'aarch64' : 'x64';
    const ext = platform === 'win32' ? 'zip' : 'tar.gz';
    const isMajorOnly = !version.includes('.');
    const basePath = isMajorOnly
      ? `java/${version}/latest/jdk-${version}`
      : `java/${version.split('.')[0]}/archive/jdk-${version}`;

    return {
      filename: `java.${ext}`,
      url: `https://download.oracle.com/${basePath}_${osName}-${javaArch}_bin.${ext}`,
    };
  },
};
