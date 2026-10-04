import * as context from '@razomy/context';
import * as abstracts from '@razomy/abstracts';

export interface Credential {
  login: string;
  password: string;
}

export interface HasCredential {
  credential: Credential;
  login: string;
  password: string;
}

function setCredential(login: string, password: string): HasCredential {
  return {
    credential: { login, password },
    login,
    password,
  };
}

export class DockerPipeline<Pgs extends context.PipelineGenerics = context.PipelineGenerics> extends context.ContextPipeline<Pgs, 'dockerPipeline'> {

  // =========================================================
  // 1. Кастомные свойства со сложными типами
  // =========================================================
  name = (val: string) => this.n({ name: val });
  folderPath = (val: string) => this.n({ folderPath: val });
  labels = (val: string) => this.n({ labels: val });
  logging = (val: string) => this.n({ logging: val });
  age = (val: string) => this.n({ age: val });
  stat = (val: string) => this.n({ stat: val });
  backup = (val: string) => this.n({ backup: val });
  volumes2 = (val: string) => this.n({ volumes2: val });
  performanceSetup = (val: string) => this.n({ performanceSetup: val });
  restart = (val: string) => this.n({ restart: val });
  content = (val: string) => this.n({ content: val });
  ports = (val: string) => this.n({ ports: val });
  extension = (val: string) => this.n({ extension: val });
  platform = (val: string) => this.n({ platform: val });
  build = (val: string) => this.n({ build: val });
  libraries = (val: string) => this.n({ libraries: val });
  containerName = (val: string) => this.n({ containerName: val });
  //complex
  current = (val: 'production' | 'local') => this.n({ current: val });
  credential = (login: string, password: string) => this.n(setCredential(login, password));
  //callbacks
  environment = (environment: (t: this) => string) => this.n({ environment: environment(this) });
  healthcheck = (healthcheck: (t: Pgs['c'], p: this) => string) =>
    this.n({ healthcheck: () => healthcheck(this.ctx, this) });
  inheritFolderPath = (inheritFolderPath: (t: Pgs['c'], p: this) => void) =>
    this.n({ inheritFolderPath: () => inheritFolderPath(this.ctx, this) });
  content2 = (content2: (t: Pgs['c'], p: this) => string) => this.n({ content2: () => content2(this.ctx, this) });
  schema = (schema: (t: Pgs['c'], p: this) => abstracts.structures.KeyValueArray<string, string>) =>
    this.n({ schema: () => schema(this.ctx, this) });
  load = (load: (t: Pgs['c'], p: this) => void) => this.n({ load: () => load(this.ctx, this) });
  save = (save: (t: Pgs['c']) => void) => this.n({ save: () => save(this.ctx) });
  combineContent = (combineContent: (t: Pgs['c']) => void) =>
    this.n({ combineContent: () => combineContent(this.ctx) });
  onStart = (onStart: (t: Pgs['c']) => void) => this.n({ onStart: () => onStart(this.ctx) });

  // =========================================================
  // 4. Вложенные пайплайны (тип cb выводится автоматически из ChildMethod)
  // =========================================================
  services = this.cM('services');
  postgres = this.cM('postgres');
  image = this.cM('image');
  docker = this.cM('docker');
  environment2 = this.cM('environment2');
  production = this.cM('production');
  local = this.cM('local');
  bouncer = this.cM('bouncer');
  scheduler = this.cM('scheduler');
  volumes = this.cM('volumes');
  dockerCompose = this.cM('dockerCompose');
  command = this.cM('command');
}
