import FixedVirtualListScroller from "./components/fixedVirtualListScroller/index.vue";
import DynamicVirtualListScroller from "./components/dynamicVirtualList/index.vue";
import {
  FixedVirtualListInstance,
  FixedVirtualListProps,
} from "./components/fixedVirtualListScroller/interface.ts";
import {
  DynamicVirtualListInstance,
  DynamicVirtualListProps,
} from "./components/dynamicVirtualList/interface.ts";
export { FixedVirtualListScroller };
export type {
  FixedVirtualListInstance,
  FixedVirtualListProps,
  DynamicVirtualListInstance,
  DynamicVirtualListProps,
};
const plugin = {
  install: (app) => {
    app.component(`FixedVirtualListScroller`, FixedVirtualListScroller);
    app.component(`DynamicVirtualListScroller`, DynamicVirtualListScroller);
  },
};
export default plugin;
