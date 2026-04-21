import {RemoteNode} from "./remote_node";
import {Razomy} from "@razomy/razomy";

export const REACTIVE_DIRECTIVE = {
  mounted(el, binding, vnode) {
    function inject<T>(k) {
      return vnode.ctx.provides[k] as T;
    }

    el.remote_node = new RemoteNode(); // Лучше называть remote_node, а не remove_node
    el.remote_node.ctx = inject<Razomy>('razomy');
    el.remote_node.key = binding.value;

    el.remote_node.render = (value) => {
      el.innerHTML = value || '';
    };

    el.remote_node.start();
  },
  updated(el, binding) {
    // ИСПРАВЛЕНИЕ: метод в классе называется updateKey (camelCase)
    if (el.remote_node.key !== binding.value) {
      el.remote_node.updateKey(binding.value);
    }
  },
  unmounted(el) {
    el.remote_node.finish();
  },
};
