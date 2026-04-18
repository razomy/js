import * as fs from 'node:fs';
import path from 'node:path';
import * as runNode from '@razomy/run/node';
import * as runtimesNode from '@razomy/runtimes/node';

function getContext(versionRuntimeDir: string) {
  const binSubDir = runtimesNode.IS_MAC ? 'Contents/Home/bin' : 'bin';
  const binPath = path.join(versionRuntimeDir, binSubDir);

  const javacExe = runtimesNode.getExePath(versionRuntimeDir, `${binSubDir}/javac`, 'bin/javac.exe');
  const javaExe = runtimesNode.getExePath(versionRuntimeDir, `${binSubDir}/java`, 'bin/java.exe');
  const nativeImgExe = runtimesNode.getExePath(versionRuntimeDir, `${binSubDir}/native-image`, 'bin/native-image.cmd');

  const env = {
    ...process.env,
    JAVA_HOME: versionRuntimeDir,
    PATH: `${binPath}${path.delimiter}${process.env.PATH}`,
  };
  return { javaExe, javacExe, nativeImgExe, env };
}

export const JAVA_RUNTIME: runtimesNode.RuntimeProvider = {
  defaultVersion: '25',

  setup(versionWorkspaceDir, versionRuntimeDir) {
    const { javacExe, nativeImgExe, env } = getContext(versionRuntimeDir);
    const javaPath = path.join(versionWorkspaceDir, 'StartCli.java');
    const javaCode = `import razomy.run.Cli;\n\npublic class StartCli {\n    public static void main(String[] args) {\n        Cli.start(args);\n    }\n}`;
    fs.writeFileSync(javaPath, javaCode);

    console.log('Compiling Java...');
    runtimesNode.execCmd(`${javacExe} StartCli.java`, versionWorkspaceDir, env);

    try {
      runtimesNode.execCmd(`${nativeImgExe} StartCli`, versionWorkspaceDir, env);
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

    return runNode.cli.spawnProcess(cmd, [packageName, functionName, params], versionWorkspaceDir, env);
  },

  async install(packageName: string, versionWorkspaceDir: string, versionRuntimeDir: string) {
    const { env } = getContext(versionRuntimeDir);
    let mvnCmd = 'mvn';

    try {
      runtimesNode.execCmd(`${runtimesNode.IS_WIN ? 'where' : 'which'} mvn`, versionWorkspaceDir, env, 'ignore');
    } catch {
      const mavenDir = path.join(versionRuntimeDir, 'maven');
      mvnCmd = path.join(mavenDir, 'apache-maven-3.9.6', 'bin', runtimesNode.IS_WIN ? 'mvn.cmd' : 'mvn');

      if (!fs.existsSync(mvnCmd)) {
        console.log('⏳ Apache Maven not found. Downloading standalone wrapper...');
        const mvnZipUrl = 'https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip';
        const zipDest = path.join(versionRuntimeDir, 'maven.zip');

        await runtimesNode.downloadFile(mvnZipUrl, zipDest);
        await runtimesNode.extractArchive(zipDest, mavenDir);
        fs.unlinkSync(zipDest);

        if (!runtimesNode.IS_WIN) runtimesNode.execCmd(`chmod +x "${mvnCmd}"`, versionWorkspaceDir, env);
      }
      mvnCmd = `"${mvnCmd}"`;
    }

    runtimesNode.execCmd(
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
