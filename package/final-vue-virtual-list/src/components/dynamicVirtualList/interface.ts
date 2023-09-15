/*
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-15 11:54:54
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-15 12:40:03
 * @FilePath: /finalVirtualList/package/final-vue-virtual-list/src/components/dynamicVirtualList/interface.ts
 * @Description:
 */
import type { UnwrapRef } from "vue";
import DynamicVirtualListComp from "./index.vue";
export type DynamicVirtualListInstance = InstanceType<
  typeof DynamicVirtualListComp
> &
  UnwrapRef<{
    scrollToTop(top: number): void;
    scrollToLeft(left: number): void;
    scrollToRow(row: number): void;
  }>;
interface DynamicVirtualListProps<T> {
  data: T[];
  direction?: string;
  minItemWidth?: number;
  minItemHeight?: number;
  visibleItemCount: number;
  gridItemRowCount?: number;
}
export type { DynamicVirtualListProps };
