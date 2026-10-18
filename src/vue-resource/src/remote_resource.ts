import * as vue from 'vue';
import * as array from '@razomy/array';
import * as abstractions from '@razomy/abstractions';
import { Razomy } from '@razomy/abstractions/meta';

export class RemoteResource {
  ctx: Razomy = undefined as any as Razomy;

  state = vue.reactive({
    notation: null as abstractions.structure.Dict<string> | null,
    listeners: [] as (() => void)[],
  });

  // Привязываем контекст с помощью стрелочной функции,
  // чтобы this не терялся при вызове из сокета
  set = (notation: abstractions.structure.Dict<string>) => {
    this.state.notation = notation;
    this.state.listeners.forEach((i) => i());
  };

  get(key: string) {
    // ЗАЩИТА ОТ NULL: Если данные еще не загрузились, возвращаем пустую строку
    if (!this.state.notation) {
      return '';
    }
    return this.state.notation[key] || '';
  }

  async load() {
    return await fetch(`${this.ctx.url}/api/get?path=${this.ctx.id}`, { method: 'GET' })
      .then((i) => i.json())
      .then((data) => this.set(data));
  }

  async start() {
    this.ctx.resource.socket.on(this.ctx.id, this.set);
    await this.load();
  }

  async finish() {
    this.ctx.resource.socket.off(this.ctx.id, this.set);
  }

  on(key: string, cb: any) {
    this.state.listeners.push(cb);
  }

  off(key: string, cb: any) {
    array.removeFirstMut(this.state.listeners, cb);
  }
}
