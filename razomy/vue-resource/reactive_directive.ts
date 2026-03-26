import * as vueResource from '@razomy/vue-resource';

export const REACTIVE_DIRECTIVE = {
  mounted(el, binding, vnode) {
    function inject<T>(k) {
      return vnode.ctx.provides[k] as T;
    }

    el.remove_node = new vueResource.RemoteNode();
    el.remove_node.ctx = inject<razomy>('razomy');
    el.remove_node.key = binding.value;
    el.remove_node.render = (value) => {
      el.innerHTML = value;
    };
    el.remove_node.start();
  },
  updated(el, binding) {
    el.remove_node.update_key(binding.value);
  },
  unmounted(el) {
    el.remove_node.finish();
  },
};
