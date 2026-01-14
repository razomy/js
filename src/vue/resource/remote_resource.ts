import {reactive} from 'vue';
import {Dict} from "razomy.dict/dict";
import remove_first from "razomy.list/remove_first";


export class RemoteResource {
  ctx: razomy = undefined as any as razomy;
  
  state = reactive({
    notation: null as Dict<string> | null,
    listeners: [] as (() => void)[]
  });

  set(notation: Dict<string>) {
    this.state.notation = notation;
    this.state.listeners.forEach(i => i());
  }

  get(key: string) {
    return this.state.notation![key];
  }

  async load() {
    return await fetch(`${this.ctx.url}/api/get?path=${this.ctx.id}`, {method: 'GET'})
      .then(i => i.json())
      .then(data => this.set(data));
  }

  async start() {
    this.ctx.resource.socket.on(this.ctx.id, this.set);
    await this.load();
  }

  async finish() {
    this.ctx.resource.socket.off(this.ctx.id, this.set);
  }

  on(key: string, cb) {
    this.state.listeners.push(cb);
  }

  off(key: string, cb) {
    remove_first(this.state.listeners, cb);
  }
}

