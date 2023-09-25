<!--
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-15 11:54:50
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-25 19:15:29
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
        :style="{ transform: translateValue(item.data_index) }"
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
    if (data.value.length > 0) {
      data.value.forEach((item: ExtraData, index: number) => {
        let dom = document.querySelector(
          `[data-index="${index}"]`
        ) as HTMLElement;
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
    }
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
  if (props.direction === "vertical") {
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
      /* there is a bug after limiting the render interval: when scrolling to the end, it cannot scroll to the last dom, which will be solved later
    bug
    */
      // if (start.value > props.data.length - props.visibleItemCount) {
      //   start.value = props.data.length - props.visibleItemCount;
      // }
      // if (end.value > props.data.length) {
      //   end.value = props.data.length;
      // }
      await nextTick(() => {
        let dom = document.querySelector(
          `[data-index="${end.value - 2}"]`
        ) as HTMLElement;
        /*
         * put a limit on the index to avoid reporting errors
         * associated with 'when scrolling to the end, it cannot scroll to the last dom' bug
         */
        if (!sizesRes.value[end.value - 1]) {
          return;
        }
        /*
      The current dom's 'translate' distance is equal to the previous dom's 'translate' plus the current dom's 'offsetHeight，dom size is equal to the current dom 'offsetHeight'
      eg: currently 99,scroll mode is 'vertical'
      99th HTMLElement size = current dom 'offsetHeight'
      'translate' distance of 99th HTMLElement = 98th HTMLElement 'translate' distance + 98th HTMLElement 'offsetHeight' property
      */

        sizesRes.value[end.value - 1].size = {
          size: (
            document.querySelector(
              `[data-index="${end.value - 1}"]`
            ) as HTMLElement
          ).offsetHeight,
          accumulator:
            sizesRes.value[end.value - 2].size.accumulator + dom.offsetHeight,
        };
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
  } else {
    const toBottomAccumulator = sizesRes.value[start.value]
      ? sizesRes.value[start.value + 1].size.accumulator
      : null;
    const toTopAccumulator = sizesRes.value[start.value]
      ? sizesRes.value[start.value].size.accumulator
      : null;
    if (toBottomAccumulator != null && toBottomAccumulator < scrollLeft.value) {
      start.value++;
      end.value = start.value + props.visibleItemCount;
      await nextTick(() => {
        let dom = document.querySelector(
          `[data-index="${end.value - 2}"]`
        ) as HTMLElement;
        if (!sizesRes.value[end.value - 1]) {
          return;
        }
        sizesRes.value[end.value - 1].size = {
          size: (
            document.querySelector(
              `[data-index="${end.value - 1}"]`
            ) as HTMLElement
          ).offsetWidth,
          accumulator:
            sizesRes.value[end.value - 2].size.accumulator + dom.offsetWidth,
        };
        if (sizesRes.value[end.value - 1].size.accumulator > totalSize.value) {
          totalSize.value = sizesRes.value[end.value - 1].size.accumulator;
        }
      });
    }
    if (toTopAccumulator != null && toTopAccumulator > scrollLeft.value) {
      start.value--;
      end.value = start.value + props.visibleItemCount;
    }
  }
};
const translateValue = computed(() => {
  return (index: number) => {
    if (sizesRes.value.length !== 0) {
      if (props.direction == "vertical") {
        return (
          "translateX(0px) translateY(" +
          sizesRes.value[index].size.accumulator +
          "px)"
        );
      } else {
        return (
          "translateX(" +
          sizesRes.value[index].size.accumulator +
          "px) translateY(0px)"
        );
      }
    }
  };
});
const handleScroll = () => {
  if (props.direction == "vertical") {
    scrollTop.value = dynamicVirtualListScroll.value.scrollTop;
  } else {
    scrollLeft.value = dynamicVirtualListScroll.value.scrollLeft;
  }
};
const currentIndex = ref(0);
const stagedIndex = ref(0);
const scrollToTop = (position: number) => {
  dynamicVirtualListScroll.value.scrollTo(0, position);
};
const scrollToLeft = (position: number) => {
  dynamicVirtualListScroll.value.scrollTo(position, 0);
};
const scrollToRow = (index: number) => {
  /**
   * @Description: scroll to row method
   * @param {number} index line number
   */
  if (index > props.data.length) {
    index = props.data.length;
  }
  const startTime = performance.now();
  console.log(startTime);
  
  const duration = 10000;
  let percent = 0;
  stagedIndex.value = currentIndex.value - index;
  const cb = (time: number) => {
    //Time of the current animation frame
    const elapsed = time - startTime;
    //The time of the current animation frame as a percentage of the set scrolling time
    percent = Math.min(elapsed / duration, 1);
    if (percent < 0) percent = 0;
    let newPosition = 0;
    let distance = 0;
    //to bottom scroll
    if (currentIndex.value <= index) {
      // currentIndex.value = 0;
      currentIndex.value = Math.floor(index * percent);
    }
    //to up scroll
    else if (currentIndex.value > index) {
      currentIndex.value = Math.floor(
        stagedIndex.value - (stagedIndex.value - index) * percent
      );
    }
    distance =
      currentIndex.value == 0
        ? sizesRes.value[currentIndex.value].size.accumulator - scrollTop.value
        : sizesRes.value[currentIndex.value - 1].size.accumulator -
          scrollTop.value;
    newPosition = scrollTop.value + distance * percent;
    //调用滚动事件
    dynamicVirtualListScroll.value.scrollTo(0, newPosition);
    if (elapsed < duration) {
      requestAnimationFrame(cb);
    }
  };
  requestAnimationFrame(cb);
};

defineExpose({
  scrollToLeft,
  scrollToTop,
  scrollToRow,
});
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
watch(
  () => scrollLeft.value,
  () => {
    updateVisibleItems();
  }
);
onBeforeMount(() => {
  sizes();
});
onMounted(() => {
  window.addEventListener("resize", async () => {
    console.log(scrollTop.value);

    await sizes();
  });
});
</script>
<style scoped lang="less">
.dynamic-virtual-list-scroll {
  position: relative;
  .dynamic-virtual-list-container {
    display: flex;
    flex-direction: row;
    .dynamic-virtual-list-item {
      position: absolute;
    }
  }
}
</style>
