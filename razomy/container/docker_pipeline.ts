import * as context from '@razomy/context';
import * as abstracts from '@razomy/abstracts';

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
  name = this.nextFactory((name: string) => ({ name: name }));
  folderPath = this.nextFactory((val: string) => ({ folderPath: val }));
  labels = this.nextFactory((val: string) => ({ labels: val }));
  logging = this.nextFactory((val: string) => ({ logging: val }));
  age = this.nextFactory((val: string) => ({ age: val }));
  stat = this.nextFactory((val: string) => ({ stat: val }));
  backup = this.nextFactory((val: string) => ({ backup: val }));
  volumes2 = this.nextFactory((val: string) => ({ volumes2: val }));
  performanceSetup = this.nextFactory((val: string) => ({ performanceSetup: val }));
  restart = this.nextFactory((val: string) => ({ restart: val }));
  content = this.nextFactory((val: string) => ({ content: val }));
  ports = this.nextFactory((val: string) => ({ ports: val }));
  extension = this.nextFactory((val: string) => ({ extension: val }));
  platform = this.nextFactory((val: string) => ({ platform: val }));
  build = this.nextFactory((val: string) => ({ build: val }));
  libraries = this.nextFactory((val: string) => ({ libraries: val }));
  containerName = this.nextFactory((val: string) => ({ containerName: val }));
  //complex
  current = this.nextFactory((val: 'production' | 'local') => ({ current: val }));
  credential = this.nextFactory((login: string, password: string) => setCredential(login, password));
  //callbacks
  environment = this.nCb((environment: (t: this) => string) => ({ environment: environment(this) }));
  healthcheck = this.nCb((healthcheck: (p: this) => string) => ({
    healthcheck: () => healthcheck(this),
  }));
  inheritFolderPath = this.nCb((inheritFolderPath: (t: this) => void) => ({
    inheritFolderPath: () => inheritFolderPath(this),
  }));
  content2 = this.nCb((content2: (t: this) => string) => ({ content2: () => content2(this) }));
  schema = this.nCb((schema: (t: this) => abstracts.structures.KeyValueArray<string, string>) => ({
    schema: () => schema(this),
  }));
  load = this.nCb((load: (t: this) => void) => ({ load: () => load(this) }));
  save = this.nCb((save: (t: this) => void) => ({ save: () => save(this) }));
  combineContent = this.nCb((combineContent: (t: this) => void) => ({
    combineContent: () => combineContent(this),
  }));
  onStart = this.nCb((onStart: (t: this) => void) => ({ onStart: () => onStart(this) }));

  // =========================================================
  // 4. Вложенные пайплайны (тип cb выводится автоматически из ChildMethod)
  // =========================================================
  services = this.childFactory('services');
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
