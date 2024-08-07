export const directive = {
  mounted(el, binding, vnode) {
    const inject = <T>(k) => vnode.ctx.provides[k] as T
    el.notation = inject<razomy>('razomy').notation;

    el.socket_on = () => {
      el.innerHTML = el.notation.store.get(el.key);
    }

    el.key = binding.value;
    el.socket_on()

    el.notation.store.on(el.key, el.socket_on);
  },
  updated(el, binding, vnode, prevVnode) {
    el.key = binding.value;
    el.socket_on()
    el.notation.store.off(el.key, el.socket_on);
    el.notation.store.on(el.key, el.socket_on);
  },
  unmounted(el) {
    el.notation.store.off(el.key, el.socket_on);
  }
}
