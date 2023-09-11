<template>
  <div class="fixedVirtualList">
    <h1>fixedVirtualList</h1>
    <div class="list">
      <FixedVirtualListScroller
        :data="listData"
        :scroll-item-height="46"
        :visible-item-count="12"
      >
        <div
          v-for="(item, index) in listData"
          :key="index"
          class="item"
        >
          {{ item.name }}
        </div>
      </FixedVirtualListScroller>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
const listData = ref([
  { name: "111" },
  { name: "222" },
  { name: "333" },
  { name: "444" },
  { name: "555" },
  { name: "666" },
  { name: "777" },
  { name: "888" },
  { name: "999" },
  { name: "000" },
]);
</script>
