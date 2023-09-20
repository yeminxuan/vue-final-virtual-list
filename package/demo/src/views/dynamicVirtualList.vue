<!--
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-15 12:18:45
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-19 12:55:09
 * @FilePath: /finalVirtualList/package/demo/src/views/dynamicVirtualList.vue
 * @Description: 
-->
<template>
  <div class="dynamicVirtualList">
    <Header />
    <DynamicVirtualListScroller
      :data="listData"
      :visible-item-count="20"
      :min-item-height="40"
    >
      <template #default="{ item }">
        <div class="item">
          <div class="top">
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
            <div class="gender">
              {{ item.gender }}
            </div>
            <div class="birthDate">
              {{ item.birthDate }}
            </div>
            <div class="isMarried">
              {{ item.isMarried ? "married" : "spinster" }}
            </div>
          </div>
          <div class="description">
            {{ item.description }}
          </div>
        </div>
      </template>
    </DynamicVirtualListScroller>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import Header from "@/components/header.vue";
import Mock from "mockjs";
import axios from "axios";
const listData = ref([]);
const mock = () => {
  Mock.mock("/api/dynamicData", {
    code: 200,
    msg: "success",
    "data|100": [
      {
        "id|+1": 1,
        avatarUrl: "/avator/w.jpg",
        name: "@name",
        "gender|1": ["man", "woman"],
        email: "@EMAIL",
        birthDate: "@date",
        "isMarried|1": [true, false],
        description: "@paragraph",
      },
    ],
  });
};
const getList = () => {
  axios({
    method: "get",
    url: "/api/dynamicData",
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
<style scoped lang="less">
.dynamicVirtualList {
  width: 100%;
  .dynamic-virtual-list-scroll {
    height: 800px;
  }
  :deep(.dynamic-virtual-list-item) {
    // margin-top: 10px;
    .item {
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        & > div {
          padding: 0 10px;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
      .description {
        width: 50%;
        padding: 0 10px;
      }
    }
    .item:hover {
      background-color: aquamarine;
    }
  }
  :deep(.dynamic-virtual-list-item:first-child) {
    margin-top: 0;
  }
}
</style>
