import type { UnwrapRef } from "vue";
import FixedVirtualListComp from "./index.vue";
export type FixedVirtualListInstance = InstanceType<typeof FixedVirtualListComp> &
  UnwrapRef<{
    scrollToTop(top: number): void;
    scrollToLeft(left: number): void;
    scrollToRow(row: number): void;
  }>;
interface FixedVirtualListProps<T> {
    data: T[];
    direction?: string;
    scrollItemWidth?: number;
    scrollItemHeight?: number;
    visibleItemCount: number;
}
export type {
  FixedVirtualListProps
};