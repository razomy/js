import * as context from '@razomy/context';
import * as abstracts from '@razomy/abstracts';
import type { PipelineGenerics, ChildPipe } from '../context/context_pipeline';

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

declare module '../context/context_pipeline' {
  interface PipelineKindMap<Pgs extends PipelineGenerics> {
    docker: DockerPipeline<Pgs>;
  }
}

export class DockerPipeline<Pgs extends PipelineGenerics = PipelineGenerics> extends context.ContextPipeline<Pgs, 'docker'> {

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
  services: ChildPipe<Pgs, 'docker', 'services'> = (cb) => this.c('services', cb);
  postgres: ChildPipe<Pgs, 'docker', 'postgres'> = (cb) => this.c('postgres', cb);
  image: ChildPipe<Pgs, 'docker', 'image'> = (cb) => this.c('image', cb);
  docker: ChildPipe<Pgs, 'docker', 'docker'> = (cb) => this.c('docker', cb);
  environment2: ChildPipe<Pgs, 'docker', 'environment2'> = (cb) => this.c('environment2', cb);
  production: ChildPipe<Pgs, 'docker', 'production'> = (cb) => this.c('production', cb);
  local: ChildPipe<Pgs, 'docker', 'local'> = (cb) => this.c('local', cb);
  bouncer: ChildPipe<Pgs, 'docker', 'bouncer'> = (cb) => this.c('bouncer', cb);
  scheduler: ChildPipe<Pgs, 'docker', 'scheduler'> = (cb) => this.c('scheduler', cb);
  volumes: ChildPipe<Pgs, 'docker', 'volumes'> = (cb) => this.c('volumes', cb);
  dockerCompose: ChildPipe<Pgs, 'docker', 'dockerCompose'> = (cb) => this.c('dockerCompose', cb);
  command: ChildPipe<Pgs, 'docker', 'command'> = (cb) => this.c('command', cb);
}

export function dockerPipeline() {
  return new DockerPipeline(null!);
}
