import {reactive} from 'vue';
import {Dict} from "razomy.js/dict/dict";
import {removeFirst} from "razomy.js/list/remove_first";

const notation_state = reactive({
  notation: null as Dict<string> | null,
  listeners: [] as (() => void)[]
});

const set = (notation: Dict<string>) => {
  notation_state.notation = notation;
  notation_state.listeners.forEach(i => i());
};

const get = (key: string) => {
  return notation_state.notation![key];
};


const load = async () => {
  return await fetch(notation_store.ctx.url + `/api/get?=${notation_store.ctx.id}`, {method: 'GET'})
    .then(i => i.json())
    .then(data => set(data));
};

const start = async () => {
  notation_store.ctx.notation.socket.on(notation_store.ctx.id, set);
  await load();
};

const finish = async () => {
  notation_store.ctx.notation.socket.off(notation_store.ctx.id, set);
};

function on(key: string, cb) {
  notation_state.listeners.push(cb);
}

function off(key: string, cb) {
  removeFirst(notation_state.listeners, cb);
}

const notation_store = {
  ctx: null as unknown as razomy,
  notation_state,
  get,
  set,
  on,
  off,
  start,
  finish,
};

export default notation_store;

