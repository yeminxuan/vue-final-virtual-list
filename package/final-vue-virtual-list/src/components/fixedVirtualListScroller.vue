<!--
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-11 16:06:23
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-11 20:04:36
 * @FilePath: /finalVirtualList/package/final-vue-virtual-list/src/components/fixedVirtualListScroller.vue
 * @Description: 
-->
<template>
  <div
    ref="fixedVirtualListScroller"
    class="fixed-virtual-list-scroller"
    @scroll.passive="handleScroll"
  >
    1123123
    <div
      class="fixed-virtual-list-container"
      :style="{ 'min-width': contentWidth + 'px' }"
    >
      <div
        v-for="(item, index) in data"
        :key="index"
        class="listItem"
      >
        {{ data }}
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
interface Props {
  data: Array<Object>;
  direction?: string;
  scrollItemWidth?: number;
  scrollItemHeight?: number;
  visibleItemCount: number;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  displayList: false,
  contentWidth: 0,
  scrollItemWidth: 0,
  scrollItemHeight: 0,
  direction: "vertical",
  visibleItemCount: 0,
});
const contentWidth = computed(() => {
  if (props.direction == "vertical") {
    return props.data.length * props.scrollItemHeight;
  } else {
    return props.data.length * props.scrollItemWidth;
  }
});
const handleScroll = () => {
  console.log(111);
  
};
</script>
<style lang="less" scoped>
.fixed-virtual-list-scroller {
  position: relative;
}
</style>
