import * as context from '@razomy/context';
import * as abstractions from '@razomy/abstractions';

export interface HasCredential {
  login: string;
  password: string;
}

function setCredential(login: string, password: string): HasCredential {
  return {
    login,
    password,
  };
}

export class DockerPipeline extends context.ContextPipeline {
  // =========================================================
  // 1. Кастомные свойства со сложными типами
  // =========================================================
  name = this.addFactory((name: string) => ({ name: name }));
  folderPath = this.addFactory((val: string) => ({ folderPath: val }));
  labels = this.addFactory((val: string) => ({ labels: val }));
  logging = this.addFactory((val: string) => ({ logging: val }));
  age = this.addFactory((val: string) => ({ age: val }));
  stat = this.addFactory((val: string) => ({ stat: val }));
  backup = this.addFactory((val: string) => ({ backup: val }));
  volumes2 = this.addFactory((val: string) => ({ volumes2: val }));
  performanceSetup = this.addFactory((val: string) => ({ performanceSetup: val }));
  restart = this.addFactory((val: string) => ({ restart: val }));
  content = this.addFactory((val: string) => ({ content: val }));
  ports = this.addFactory((val: string) => ({ ports: val }));
  extension = this.addFactory((val: string) => ({ extension: val }));
  platform = this.addFactory((val: string) => ({ platform: val }));
  build = this.addFactory((val: string) => ({ build: val }));
  libraries = this.addFactory((val: string) => ({ libraries: val }));
  containerName = this.addFactory((val: string) => ({ containerName: val }));
  //complex
  current = this.addFactory((val: 'production' | 'local') => ({ current: val }));
  credential = this.addFactory((login: string, password: string) => setCredential(login, password));
  //callbacks
  environment = this.addPipe((environment: (t: this) => string) => ({ environment: environment(this) }));
  healthcheck = this.addPipe((healthcheck: (p: this) => string) => ({
    healthcheck: () => healthcheck(this),
  }));
  inheritFolderPath = this.addPipe((inheritFolderPath: (t: this) => void) => ({
    inheritFolderPath: () => inheritFolderPath(this),
  }));
  content2 = this.addPipe((content2: (t: this) => string) => ({ content2: () => content2(this) }));
  schema = this.addPipe((schema: (t: this) => abstractions.structure.KeyValueArray<string, string>) => ({
    schema: () => schema(this),
  }));
  load = this.addPipe((load: (t: this) => void) => ({ load: () => load(this) }));
  save = this.addPipe((save: (t: this) => void) => ({ save: () => save(this) }));
  combineContent = this.addPipe((combineContent: (t: this) => void) => ({
    combineContent: () => combineContent(this),
  }));
  onStart = this.addPipe((onStart: (t: this) => void) => ({ onStart: () => onStart(this) }));

  // =========================================================
  // 4. Вложенные пайплайны (тип cb выводится автоматически из ChildMethod)
  // =========================================================
  services = this.childFactory('services');
  migration = this.childFactory('migration');
  postgres = this.childFactory('postgres');
  image = this.childFactory('image');
  docker = this.childFactory('docker');
  environment2 = this.childFactory('environment2');
  production = this.childFactory('production');
  local = this.childFactory('local');
  bouncer = this.childFactory('bouncer');
  scheduler = this.childFactory('scheduler');
  volumes = this.childFactory('volumes');
  dockerCompose = this.childFactory('dockerCompose');
  command = this.childFactory('command');
}
