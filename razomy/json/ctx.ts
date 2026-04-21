export interface Ctx {
  has(key: string): boolean;

  get(key: string): any;

  set(key: string, value: any): void;

  setIfDefault(key: string, value: any): void;

  items(): { [key: string]: any };
}
