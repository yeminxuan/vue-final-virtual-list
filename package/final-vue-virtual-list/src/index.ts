/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-11 18:11:03
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-11 20:03:48
 * @FilePath: /finalVirtualList/package/final-vue-virtual-list/src/index.ts
 * @Description:
 */
import FixedVirtualListScroller from "./components/fixedVirtualListScroller.vue";
export { FixedVirtualListScroller };
const plugin = {
  install: (app) => {
    app.component(`FinalVueVirtualList`, FixedVirtualListScroller);
  },
};
export default plugin;