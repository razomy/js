export interface BrowserRunProvider {
  environment: 'browser_js';
  strategy: 'instant';
  packageName: string;
}

export interface BrowserTaskProvider {
  environment: 'browser_js';
  strategy: 'task';
  packageName: string;
}

export interface BrowserEsmShFetchRunProvider {
  environment: 'browser_js';
  strategy: 'esm_sh_fetch_and_instant';
  packageName: string;
}

export interface ServerRunProvider {
  environment: 'server_js';
  strategy: 'instant';
  packageName: string;
}

export interface ServerJobProvider {
  environment: 'server_js';
  strategy: 'job';
  packageName: string;
}

export interface ServerEsmShFetchRunProvider {
  environment: 'server_js';
  strategy: 'esm_sh_fetch_and_instant';
  packageName: string;
}

export type RunProvider =
  | BrowserRunProvider
  | BrowserTaskProvider
  | BrowserEsmShFetchRunProvider
  | ServerRunProvider
  | ServerJobProvider
  | ServerEsmShFetchRunProvider;
