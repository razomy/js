import * as context from '@razomy/context';
import * as abstracts from '@razomy/abstracts';

interface Credential {
  login: string;
  password: string;
}

interface HasCredential {
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

declare module '@razomy/context' {
  interface ContextPipeline<
    TC extends object = {},
    TP extends context.ContextPipeline = any,
    TCh extends Record<PropertyKey, context.ContextPipeline> = any,
    TCA extends object = {},
  > {
    // 1. Кастомные свойства с сложными типами
    credential(login: string, password: string): context.NextCtx<TC, TP, TCh, TCA, HasCredential>;
    current: context.Field<TC, TP, TCh, TCA, 'current', 'production' | 'local'>;

    // 2. Обычные свойства в 1 строку
    name: context.Field<TC, TP, TCh, TCA, 'name'>;
    folderPath: context.Field<TC, TP, TCh, TCA, 'folderPath'>;
    labels: context.Field<TC, TP, TCh, TCA, 'labels'>;
    logging: context.Field<TC, TP, TCh, TCA, 'logging'>;
    age: context.Field<TC, TP, TCh, TCA, 'age'>;
    stat: context.Field<TC, TP, TCh, TCA, 'stat'>;
    backup: context.Field<TC, TP, TCh, TCA, 'backup'>;
    volumes2: context.Field<TC, TP, TCh, TCA, 'volumes2'>;
    performanceSetup: context.Field<TC, TP, TCh, TCA, 'performanceSetup'>;
    restart: context.Field<TC, TP, TCh, TCA, 'restart'>;
    content: context.Field<TC, TP, TCh, TCA, 'content'>;
    ports: context.Field<TC, TP, TCh, TCA, 'ports'>;
    extension: context.Field<TC, TP, TCh, TCA, 'extension'>;
    platform: context.Field<TC, TP, TCh, TCA, 'platform'>;
    build: context.Field<TC, TP, TCh, TCA, 'build'>;
    libraries: context.Field<TC, TP, TCh, TCA, 'libraries'>;
    containerName: context.Field<TC, TP, TCh, TCA, 'containerName'>;

    // 3. Функциональные свойства
    healthcheck(healthcheck: (t: TC, p: this) => string): context.NextCtx<TC, TP, TCh, TCA, { healthcheck: () => string }>;
    environment(environment: (t: this) => string): context.NextCtx<TC, TP, TCh, TCA, { environment: string }>;
    inheritFolderPath(inheritFolderPath: (t: TC, p: this) => void): context.NextCtx<TC, TP, TCh, TCA, { inheritFolderPath: () => string }>;
    content2(content2: (t: TC, p: this) => string): context.NextCtx<TC, TP, TCh, TCA, { content2: () => string }>;
    schema(schema: (t: TC, p: this) => abstracts.structures.KeyValueArray<string, string>): context.NextCtx<
      TC,
      TP,
      TCh,
      TCA,
      { schema: () => abstracts.structures.KeyValueArray<string, string> }
    >;
    load(load: (t: TC, p: this) => void): context.NextCtx<TC, TP, TCh, TCA, { load: () => void }>;
    save(save: (t: TC) => void): context.NextCtx<TC, TP, TCh, TCA, { save: () => void }>;
    combineContent(combineContent: (t: TC) => void): context.NextCtx<TC, TP, TCh, TCA, { combineContent: () => void }>;
    onStart(onStart: (t: TC) => void): context.NextCtx<TC, TP, TCh, TCA, { onStart: () => void }>;

    // 4. Вложенные пайплайны в 1 строку
    services: context.ChildMethod<TC, TP, TCh, TCA, 'services'>;
    postgres: context.ChildMethod<TC, TP, TCh, TCA, 'postgres'>;
    image: context.ChildMethod<TC, TP, TCh, TCA, 'image'>;
    docker: context.ChildMethod<TC, TP, TCh, TCA, 'docker'>;
    environment2: context.ChildMethod<TC, TP, TCh, TCA, 'environment2'>;
    production: context.ChildMethod<TC, TP, TCh, TCA, 'production'>;
    local: context.ChildMethod<TC, TP, TCh, TCA, 'local'>;
    bouncer: context.ChildMethod<TC, TP, TCh, TCA, 'bouncer'>;
    scheduler: context.ChildMethod<TC, TP, TCh, TCA, 'scheduler'>;
    volumes: context.ChildMethod<TC, TP, TCh, TCA, 'volumes'>;
    dockerCompose: context.ChildMethod<TC, TP, TCh, TCA, 'dockerCompose'>;
    command: context.ChildMethod<TC, TP, TCh, TCA, 'command'>;
  }
}

// 2. Реализация через прототип
const proto = context.ContextPipeline.prototype as any;

proto.credential = function (login: string, password: string) {
  return this.m(setCredential(login, password));
};

// Простые свойства
const simpleProps = [
  'name',
  'folderPath',
  'labels',
  'logging',
  'age',
  'stat',
  'backup',
  'volumes2',
  'performanceSetup',
  'restart',
  'current',
  'content',
  'ports',
  'extension',
  'platform',
  'build',
  'libraries',
  'containerName',
];

for (const prop of simpleProps) {
  proto[prop] = function (val: any) {
    return this.m({ [prop]: val });
  };
}

// Функциональные свойства
proto.healthcheck = function (fn: any) {
  return this.m({ healthcheck: () => fn(this.ctx, this) });
};
proto.environment = function (fn: any) {
  return this.m({ environment: fn(this) });
};
proto.inheritFolderPath = function (fn: any) {
  return this.m({ inheritFolderPath: () => fn(this.ctx, this) });
};
proto.content2 = function (fn: any) {
  return this.m({ content2: () => fn(this.ctx, this) });
};
proto.schema = function (fn: any) {
  return this.m({ schema: () => fn(this.ctx, this) });
};
proto.load = function (fn: any) {
  return this.m({ load: () => fn(this.ctx, this) });
};
proto.save = function (fn: any) {
  return this.m({ save: () => fn(this.ctx) });
};
proto.combineContent = function (fn: any) {
  return this.m({ combineContent: () => fn(this.ctx) });
};
proto.onStart = function (fn: any) {
  return this.m({ onStart: () => fn(this.ctx) });
};

// Вложенные контексты
const childContexts = [
  'services',
  'postgres',
  'image',
  'docker',
  'environment2',
  'production',
  'local',
  'bouncer',
  'scheduler',
  'volumes',
  'dockerCompose',
  'command',
];

for (const name of childContexts) {
  proto[name] = function (onStart: any) {
    return this.c(name, onStart);
  };
}
