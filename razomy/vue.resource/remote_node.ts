export class RemoteNode {
  ctx: razomy = undefined as any as razomy;
  key: string = '';

  constructor() {
  }

  render: (key: string) => void = () => {
  };

  start() {
    this.render(this.ctx.resource.store.get(this.key))
    this.ctx.resource.store.on(this.key, this.render);
  }

  updateKey(key: string) {
    this.render(this.ctx.resource.store.get(this.key))
    this.ctx.resource.store.off(this.key, this.render);
    this.key = key;
    this.ctx.resource.store.on(this.key, this.render);
  }

  finish() {
    this.ctx.resource.store.off(this.key, this.render);
  }
}
