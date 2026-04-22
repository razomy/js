import * as vue from 'vue';
import * as dict from '@razomy/dict';
import * as array from '@razomy/array';
import {Razomy} from "@razomy/razomy";

export class RemoteResource {
  ctx: Razomy = undefined as any as Razomy;

  state = vue.reactive({
    notation: null as abstracts.structures.Dict<string> | null,
    listeners: [] as (() => void)[],
  });

  // Привязываем контекст с помощью стрелочной функции,
  // чтобы this не терялся при вызове из сокета
  set = (notation: abstracts.structures.Dict<string>) => {
    this.state.notation = notation;
    this.state.listeners.forEach((i) => i());
  }

  get(key: string) {
    // ЗАЩИТА ОТ NULL: Если данные еще не загрузились, возвращаем пустую строку
    if (!this.state.notation) return '';
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
