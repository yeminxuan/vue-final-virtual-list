/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-11 20:06:18
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-13 19:34:57
 * @FilePath: /finalVirtualList/package/final-vue-virtual-list/src/index.ts
 * @Description: 
 */
import FixedVirtualListScroller from "./components/fixedVirtualListScroller.vue";
import {FixedVirtualListInstance,FixedVirtualListProps} from './components/interface.ts';
export { FixedVirtualListScroller };
export type {FixedVirtualListInstance,FixedVirtualListProps};
const plugin = {
  install: (app) => {
    app.component(`FixedVirtualListScroller`, FixedVirtualListScroller);
  },
};
export default plugin;