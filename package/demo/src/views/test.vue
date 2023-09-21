<!--
 * @Author: 叶敏轩 mc20000406@163.com
 * @Date: 2023-09-21 11:41:53
 * @LastEditors: 叶敏轩 mc20000406@163.com
 * @LastEditTime: 2023-09-21 12:48:43
 * @FilePath: /finalVirtualList/package/demo/src/views/test.vue
 * @Description: 
-->
<template>
  <div class="wrap">
    <div class="list">
      <div
        v-for="(item, index) in listData"
        :key="index"
        class="item"
      >
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onBeforeMount, onMounted, ref } from "vue";
import type { Ref } from "vue";
import Mock from "mockjs";
import axios from "axios";
interface List {
  id: number;
  avatarUrl: string;
  name: string;
  gender: string;
  birthDate: string;
  isMarried: boolean;
  description: string;
}
const listData: Ref<List[]> = ref([]);
const mock = () => {
  Mock.mock("/api/test", {
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
const getList = async() => {
  await axios({
    method: "get",
    url: "/api/test",
  }).then((response) => {
    listData.value = response.data.data;
  });
};
onBeforeMount(() => {
  mock();
});
onMounted(async() => {
  await getList();
  nextTick(() => {
    console.log(document.getElementsByClassName("item")[0].offsetWidth);

  });
  
});
</script>
<style lang="less" scoped>
.wrap {
    .list {
        display: flex;
    }
}
</style>
