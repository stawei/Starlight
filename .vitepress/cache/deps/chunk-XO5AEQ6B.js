import {
  init_vue_runtime_esm_bundler
} from "./chunk-KQ22XY7Y.js";

// node_modules/.pnpm/vitepress@1.5.0_@algolia+cl_6950750745e12fb728058bab40e41e18/node_modules/vitepress/lib/vue-demi.mjs
init_vue_runtime_esm_bundler();
init_vue_runtime_esm_bundler();
var isVue2 = false;
var isVue3 = true;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}

export {
  isVue2,
  isVue3,
  set,
  del
};
/*! Bundled license information:

vitepress/lib/vue-demi.mjs:
  (**
   * vue-demi v0.14.7
   * Copyright (c) 2020-present, Anthony Fu
   * @license MIT
   *)
*/
//# sourceMappingURL=chunk-XO5AEQ6B.js.map
