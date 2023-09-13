<template>
  <div class="fixedVirtualList">
    <h1>fixedVirtualList</h1>
    <FixedVirtualListScroller
      ref="customVirtualList"
      :data="listData"
      :scroll-item-height="46"
      :visible-item-count="20"
    >
      <template #default="{ item }">
        <div
          class="item"
          @click="handle"
        >
          <div class="index">
            {{ item.id }}
          </div>
          <img
            :src="item.avatarUrl"
            alt=""
          >
          <div class="name">
            {{ item.name }}
          </div>
          <div class="birthDate">
            {{ item.birthDate }}
          </div>
          <div class="isMarried">
            {{ item.isMarried ? "married" : "spinster" }}
          </div>
        </div>
      </template>
    </FixedVirtualListScroller>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from "vue";
import type {FixedVirtualListInstance} from '../../../final-vue-virtual-list/src/index.ts';
import Mock from "mockjs";
import axios from "axios";
const listData = ref([]);
const customVirtualList=ref<FixedVirtualListInstance>();
const handle = () => {
  customVirtualList.value?.scrollToTop(1000);
};
const mock = () => {
  Mock.mock("/api/data", {
    code: 200,
    msg: "success",
    "data|5000": [
      {
        "id|+1": 1,
        avatarUrl: "@image",
        name: "@name",
        "gender|1": ["man", "woman"],
        email: "@EMAIL",
        birthDate: "@date",
        "isMarried|1": [true, false],
      },
    ],
  });
};
const getList = () => {
  axios({
    method: "get",
    url: "/api/data",
  }).then((response) => {
    listData.value = response.data.data;
  });
};
onBeforeMount(() => {
  mock();
});
onMounted(() => {
  getList();
});
</script>
<style style="scoped" lang="less">
.fixedVirtualList {
  height: 100%;
  .fixed-virtual-list-scroller {
    height: 800px;
  }
  .fixed-virtual-list-item {
    .item {
      display: flex;
      align-items: center;
      padding: 12px;
      & > div {
        padding: 0 5px;
      }
      img {
        padding: 0 5px;
        width: 20px;
        object-fit: cover;
        height: 20px;
      }
    }
  }

  .fixed-virtual-list-item:nth-child(odd) {
    background-color: #ccc;
  }
}
</style>
