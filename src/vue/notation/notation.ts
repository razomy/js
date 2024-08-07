import notation_store from "razomy.js/vue/notation/notation_store";
import socket from "razomy.js/vue/notation/socket";

export interface notation {
  store: typeof notation_store
  socket: typeof socket
}