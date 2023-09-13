<template>
  <div
    ref="fixedVirtualListScroller"
    class="fixed-virtual-list-scroller"
    :style="{
      'overflow-y': direction == 'vertical' ? 'scroll' : 'hidden',
      'overflow-x': direction == 'vertical' ? 'hidden' : 'scroll',
    }"
    @scroll.passive="handleScroll"
  >
    <div ref="rerenderBefore">
      <slot name="rerenderBefore" />
    </div>
    <div
      class="fixed-virtual-list-container"
      :style="{ 'min-width': contentWidth, 'min-height': contentHeight }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        class="fixed-virtual-list-item"
        :style="{
          transform: translateValue(item.data_index),
        }"
      >
        <slot :item="item" />
      </div>
    </div>
    <div ref="rerenderAfter">
      <slot name="rerenderAfter" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, defineExpose } from "vue";
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
const fixedVirtualListScroller = ref();
const scrollToTop = (value: number) => {
  fixedVirtualListScroller.value.scrollTo({
    top: value,
    behavior: "smooth",
  });
};
const scrollTop = ref(0);
const scrollLeft = ref(0);
const start = ref(0);
const end = ref(0);
const contentWidth = computed(() => {
  if (props.direction == "vertical") {
    return "auto";
  } else {
    return props.data.length * props.scrollItemWidth + "px";
  }
});
const contentHeight = computed(() => {
  if (props.direction == "vertical") {
    return props.data.length * props.scrollItemHeight + "px";
  } else {
    return "auto";
  }
});
const computedStartAndEnd = () => {
  if (props.direction == "vertical") {
    start.value = Math.floor(scrollTop.value / props.scrollItemHeight);
    end.value = start.value + props.visibleItemCount;
  } else {
    start.value = Math.floor(scrollLeft.value / props.scrollItemWidth);
    end.value = start.value + props.visibleItemCount;
  }
};
const translateValue = computed(() => {
  return (index: number) => {
    if (props.direction == "vertical") {
      return (
        "translateX(0px) translateY(" + props.scrollItemHeight * index + "px)"
      );
    } else {
      return (
        "translateX(" +
        props.scrollItemWidth * item.data_index +
        "px) translateY(0px)"
      );
    }
  };
});
const visibleItems: Ref<T[]> = computed(() => {
  computedStartAndEnd();
  props.data.forEach((item: T, index: number) => {
    item["data_index"] = index;
  });
  return props.data.slice(start.value, end.value);
});
const handleScroll = () => {
  if (props.direction == "vertical") {
    scrollTop.value = fixedVirtualListScroller.value.scrollTop;
  } else {
    scrollLeft.value = fixedVirtualListScroller.value.scrollLeft;
  }
};
defineExpose({
  scrollToTop,
});
</script>
<style lang="less" scoped>
.fixed-virtual-list-scroller {
  position: relative;
  height: 100%;
  .fixed-virtual-list-container {
    .fixed-virtual-list-item {
      position: absolute;
      width: 100%;
    }
  }
}
</style>
