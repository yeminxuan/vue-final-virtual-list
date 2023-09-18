<!--
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-15 11:54:50
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-18 18:37:56
 * @FilePath: /finalVirtualList/package/final-vue-virtual-list/src/components/dynamicVirtualList/index.vue
 * @Description: 
-->
<template>
  <div
    ref="dynamicVirtualListScroll"
    class="dynamic-virtual-list-scroll"
    :style="{
      'overflow-y': direction == 'vertical' ? 'scroll' : 'hidden',
      'overflow-x': direction == 'vertical' ? 'hidden' : 'scroll',
    }"
    @scroll.passive="handleScroll"
  >
    <div
      class="dynamic-virtual-list-container"
      :style="{ 'min-width': contentWidth, 'min-height': contentHeight }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        ref="dynamicVirtualListItemRef"
        class="dynamic-virtual-list-item"
        :style="{
          transform: translateValue(item.data_index),
        }"
      >
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
interface CustomObject {
  data_index: number;
}
interface Props {
  data: Array<Object>;
  direction?: string;
  minItemWidth?: number;
  minItemHeight?: number;
  visibleItemCount: number;
  gridItemRowCount?: number;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  displayList: false,
  contentWidth: 0,
  minItemWidth: 0,
  minItemHeight: 0,
  direction: "vertical",
  visibleItemCount: 0,
  gridItemRowCount: 0,
});
const dynamicVirtualListScroll = ref();
const scrollTop = ref(0);
const scrollLeft = ref(0);
const start = ref(0);
const end = ref(20);
const dynamicVirtualListItemRef = ref();
const resizeObserver = ref();
const contentWidth = computed(() => {
  if (props.direction == "vertical") {
    return "auto";
  } else {
    return props.data.length * props.minItemWidth + "px";
  }
});
const contentHeight = computed(() => {
  if (props.direction == "vertical") {
    return props.data.length * props.minItemHeight + "px";
  } else {
    return "auto";
  }
});
const visibleItems = computed(<T extends CustomObject>(): Array<T> => {
  computedStartAndEnd();
  props.data.forEach((item: Object, index: number) => {
    const customItem = item as CustomObject;
    customItem["data_index"] = index;
  });
  return props.data.slice(start.value, end.value) as T[];
});
const computedStartAndEnd = () => {
  /**
   * @Description: computed start_index and end_index
   */
  // if (props.direction == "vertical") {
  //   start.value = Math.floor(scrollTop.value / props.minItemHeight);
  //   end.value = start.value + props.visibleItemCount;
  // } else {
  //   start.value = Math.floor(scrollLeft.value / props.minItemWidth);
  //   end.value = start.value + props.visibleItemCount;
  // }
};
let totalSize = 0;
const observer = new ResizeObserver((entries:ResizeObserverEntry[]) => {
  for (const entry of entries) {
    const observeSize = entry.borderBoxSize[0];
    if (props.direction == "vertical") {
      entry.target.style.transform =
        "translateX(0px) translateY(" + totalSize + "px)";
      totalSize += observeSize.blockSize;
    } else {
      entry.target.style.transform =
        "translateX(" + totalSize + "px) translateY(0px)";
      totalSize += observeSize.inlineSize;
    }
  }
});
const translateValue = computed(() => {
  return (index: number) => {
    nextTick(() => {
      observer.observe(dynamicVirtualListItemRef.value[index]);
    });
  };
});
const handleScroll = () => {
  if (props.direction == "vertical") {
    scrollTop.value = dynamicVirtualListScroll.value.scrollTop;
  } else {
    scrollLeft.value = dynamicVirtualListScroll.value.scrollLeft;
  }
};
onMounted(() => {});
</script>
<style scoped lang="less">
.dynamic-virtual-list-scroll {
  position: relative;
  .dynamic-virtual-list-container {
    .dynamic-virtual-list-item {
      position: absolute;
    }
  }
}
</style>
