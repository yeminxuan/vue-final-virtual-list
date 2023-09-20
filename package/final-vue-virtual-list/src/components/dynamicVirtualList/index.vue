<!--
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-15 11:54:50
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-20 19:22:15
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
      :style="{
        [direction === 'vertical' ? 'min-height' : 'min-width']:
          totalSize + 'px',
      }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        ref="dynamicVirtualListItemRef"
        :data-index="item.data_index"
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
import { ref, computed, onMounted, nextTick, watch, onBeforeMount } from "vue";
import type { Ref } from "vue";
interface Data {
  id: number;
  avatarUrl: string;
  name: string;
  gender: string;
  email: string;
  birthDate: string;
  isMarried: boolean;
  description: string;
}
interface ExtraData extends Data {
  data_index: number;
  size: Size;
  cSize: number;
}
interface Props {
  data: ExtraData[];
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
interface Size {
  accumulator: number;
  size: number;
}
const totalSize = ref(0);
const dynamicVirtualListScroll = ref();
const scrollTop = ref(0);
const scrollLeft = ref(0);
const translateSize = ref(0);
const start = ref(0);
const end = ref(props.visibleItemCount);
const dynamicVirtualListItemRef = ref();
const data = ref(props.data);
const sizesRes: Ref<ExtraData[]> = ref([]);
const sizes = async () => {
  let arr: ExtraData[] = [];
  let accumulator = 0;
  let current;
  await nextTick(() => {
    data.value.forEach((item: ExtraData, index: number) => {
      let dom = document.querySelector(
        `[data-index="${index}"]`
      ) as HTMLElement;
      if (!dom) {
        console.log("不村子");
      }
      current =
        props.direction === "vertical"
          ? dom
            ? dom.offsetHeight || props.minItemHeight
            : props.minItemHeight
          : dom
            ? dom.offsetWidth || props.minItemWidth
            : props.minItemWidth;

      let obj: Size = {
        accumulator,
        size: current,
      };
      accumulator += current;
      item["size"] = obj;
      arr.push({
        ...item,
        size: obj,
      });
    });
    sizesRes.value = arr;
  });
};
const visibleItems = computed((): ExtraData[] => {
  props.data.forEach((item: ExtraData, index: number) => {
    item["data_index"] = index;
  });
  return props.data.slice(start.value, end.value);
});
const updateVisibleItems = async () => {
  /**
   * @Description: update the start/end index method as you scroll
   */
  const toBottomAccumulator = sizesRes.value[start.value]
    ? sizesRes.value[start.value + 1].size.accumulator
    : null;
  const toTopAccumulator = sizesRes.value[start.value]
    ? sizesRes.value[start.value].size.accumulator
    : null;
  //computed boundary
  if (start.value < 0) start.value = 0;

  //scroll down to update the index
  if (toBottomAccumulator != null && toBottomAccumulator < scrollTop.value) {
    start.value++;
    end.value = start.value + props.visibleItemCount;
    if (start.value > props.data.length - props.visibleItemCount) {
      start.value = props.data.length - props.visibleItemCount;
    }
    if (end.value > props.data.length) {
      end.value = props.data.length;
    }
    console.log("滚动了", start.value, end.value);

    await nextTick(() => {
      let dom = document.querySelector(
        `[data-index="${end.value - 2}"]`
      ) as HTMLElement;
      sizesRes.value[end.value - 1].size = {
        size: dom.offsetHeight,
        accumulator:
          sizesRes.value[end.value - 2].size.accumulator + dom.offsetHeight,
      };
      console.log(sizesRes.value[end.value - 1].size);
      
      if (sizesRes.value[end.value - 1].size.accumulator > totalSize.value) {
        totalSize.value = sizesRes.value[end.value - 1].size.accumulator;
      }
    });
  }
  
  //scroll up to update the index
  if (toTopAccumulator != null && toTopAccumulator > scrollTop.value) {
    start.value--;
    end.value = start.value + props.visibleItemCount;
  }
};
const translateValue = computed(() => {
  return (index: number) => {
    nextTick(() => {
      let dom = document.querySelector(
        `[data-index="${index}"]`
      ) as HTMLElement;
      if (props.direction == "vertical") {
        dom.style.transform =
          "translateX(0px) translateY(" +
          sizesRes.value[index].size.accumulator +
          "px)";
      } else {
        dom.style.transform =
          "translateX(0px) translateY(" +
          sizesRes.value[index].size.accumulator +
          "px)";
      }
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
interface ScrollInfo {
  start: number;
  end: number;
}
watch(
  () => props.data,
  async (newVal) => {
    data.value = newVal;
    await sizes();
  }
);
watch(
  () => scrollTop.value,
  () => {
    updateVisibleItems();
  }
);
onBeforeMount(() => {});
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
