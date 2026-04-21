import {Razomy} from "@razomy/razomy";

export class RemoteNode {
  ctx: Razomy = undefined as any as Razomy;
  key: string = '';

  constructor() {}

  render: (value: string) => void = () => {};

  // Обертка, которая сама достает значение из store и вызывает render
  private _listener = () => {
    const value = this.ctx.resource.store.get(this.key);
    this.render(value);
  };

  start() {
    this._listener(); // Первичный рендер
    // Передаем в store именно обертку, а не просто render
    this.ctx.resource.store.on(this.key, this._listener);
  }

  updateKey(key: string) {
    this.ctx.resource.store.off(this.key, this._listener);
    this.key = key;
    this._listener(); // Рендерим новое значение
    this.ctx.resource.store.on(this.key, this._listener);
  }

  finish() {
    this.ctx.resource.store.off(this.key, this._listener);
  }
}
