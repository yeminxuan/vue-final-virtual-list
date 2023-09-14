import FixedVirtualListScroller from "./components/fixedVirtualListScroller/index.vue";
import {
  FixedVirtualListInstance,
  FixedVirtualListProps,
} from "./components/fixedVirtualListScroller/interface.ts";
export { FixedVirtualListScroller };
export type { FixedVirtualListInstance, FixedVirtualListProps };
const plugin = {
  install: (app) => {
    app.component(`FixedVirtualListScroller`, FixedVirtualListScroller);
  },
};
export default plugin;
